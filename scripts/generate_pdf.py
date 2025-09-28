from pathlib import Path
import textwrap

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
MARGIN_X = 60
MARGIN_TOP = 60
MARGIN_BOTTOM = 60
TEXT_WIDTH = PAGE_WIDTH - 2 * MARGIN_X

LINE_HEIGHT = {
    20: 28,
    16: 22,
    14: 20,
    13: 18,
    12: 16,
    11: 15
}

class PDFBuilder:
    def __init__(self):
        self.pages = []
        self._current_lines = []
        self.current_y = 0
        self.current_font = None
        self.current_size = None
        self.start_page()

    def start_page(self):
        self._current_lines = ['BT', f"1 0 0 1 {MARGIN_X} {PAGE_HEIGHT - MARGIN_TOP} Tm"]
        self.current_y = PAGE_HEIGHT - MARGIN_TOP
        self.current_font = None
        self.current_size = None

    def finish_page(self):
        self._current_lines.append('ET')
        page_bytes = "\n".join(self._current_lines).encode('latin-1', 'replace')
        self.pages.append(page_bytes)

    def set_font(self, font: str, size: int):
        if self.current_font == font and self.current_size == size:
            return
        leading = LINE_HEIGHT.get(size, int(size * 1.4))
        self._current_lines.append(f"{font} {size} Tf")
        self._current_lines.append(f"{leading} TL")
        self.current_font = font
        self.current_size = size

    def wrap_text(self, text: str, size: int):
        if not text:
            return ['']
        approx_char_width = size * 0.52
        max_chars = max(1, int(TEXT_WIDTH / approx_char_width))
        return textwrap.wrap(text, width=max_chars)

    def ensure_space(self, lines_needed: int, size: int):
        leading = LINE_HEIGHT.get(size, int(size * 1.4))
        required = lines_needed * leading
        if self.current_y - required < MARGIN_BOTTOM:
            # finish current page and start a new one
            self.finish_page()
            self.start_page()
            if self.current_font and self.current_size:
                self.set_font(self.current_font, self.current_size)

    def add_paragraph(self, text: str, font: str, size: int, extra_space: int = 6, bullet: bool = False):
        lines = self.wrap_text(text, size)
        leading = LINE_HEIGHT.get(size, int(size * 1.4))
        self.ensure_space(len(lines), size)
        self.set_font(font, size)
        for line in lines:
            display = f"• {line}" if bullet and line == lines[0] else line
            self._current_lines.append(f"({escape(display)}) Tj")
            self._current_lines.append('T*')
            self.current_y -= leading
        if extra_space:
            self.ensure_space(1, size)
            self._current_lines.append(f"0 {-extra_space} Td")
            self.current_y -= extra_space

    def add_spacer(self, amount: int):
        if amount <= 0:
            return
        self.ensure_space(1, 12)
        self._current_lines.append(f"0 {-amount} Td")
        self.current_y -= amount


def escape(text: str) -> str:
    return text.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def build_pdf(output_path: Path):
    builder = PDFBuilder()

    builder.add_paragraph('Guia de oraciones por las vocaciones sacerdotales', '/F2', 20, extra_space=12)

    builder.add_paragraph('1. Oraciones breves para la familia (uso diario)', '/F2', 14, extra_space=8)
    builder.add_paragraph('a. Al comenzar el dia (1 min)', '/F2', 13, extra_space=4)
    builder.add_paragraph('Senor Jesus, Pastor bueno, te ofrezco este dia por las vocaciones sacerdotales. Mira con amor a nuestra Arquidiocesis y al Seminario "Nuestra Senora de Guadalupe". Llama a muchos jovenes a seguirte; fortalece a los seminaristas; sostene a los formadores. Que en nuestra familia se haga tu voluntad. Amen.', '/F1', 12)
    builder.add_paragraph('Padre Nuestro – Ave Maria – Gloria.', '/F1', 11, extra_space=10)

    builder.add_paragraph('b. En la noche (examen y suplica, 2-3 min)', '/F2', 13, extra_space=4)
    builder.add_paragraph('Te doy gracias, Senor, por tus dones de hoy. Perdon por lo que no hice bien. Te pido por los sacerdotes, por quienes discernen su vocacion y por los que dudan. Concede a los jovenes un corazon disponible y valiente. Jesus, danos santos sacerdotes. Maria de Guadalupe, ruega por nosotros.', '/F1', 12)
    builder.add_paragraph('Padre Nuestro – Salve.', '/F1', 11, extra_space=10)

    builder.add_paragraph('c. Bendicion de la mesa con intencion vocacional', '/F2', 13, extra_space=4)
    builder.add_paragraph('Bendeci, Senor, estos alimentos y a quienes los prepararon. Te pedimos, por intercesion de Nuestra Senora de Guadalupe, que no falten sacerdotes santos para tu Iglesia. Amen.', '/F1', 12, extra_space=10)

    builder.add_paragraph('d. Jaculatorias para el dia', '/F2', 13, extra_space=4)
    builder.add_paragraph('Senor, envia obreros a tu mies.', '/F1', 12, bullet=True, extra_space=2)
    builder.add_paragraph('Jesus, Sumo y Eterno Sacerdote, santifica a tus sacerdotes.', '/F1', 12, bullet=True, extra_space=2)
    builder.add_paragraph('Maria de Guadalupe, guarda en tu corazon a nuestros seminaristas.', '/F1', 12, bullet=True, extra_space=10)

    builder.add_paragraph('2. Rosario por las vocaciones', '/F2', 14, extra_space=8)
    builder.add_paragraph('Intencion general: por el Seminario Metropolitano "Nuestra Senora de Guadalupe", por sus formadores y seminaristas, y por nuevas y santas vocaciones.', '/F1', 12)
    builder.add_paragraph('Señal de la Cruz y acto de contricion breve. Ofrecimiento: “Ofrecemos este Rosario para que el Senor suscite y sostenga vocaciones sacerdotales en nuestra Arquidiocesis.”', '/F1', 12)
    builder.add_paragraph('Misterios segun el dia, agregando antes de cada decena: “En este misterio pedimos por los formadores y los jovenes que sienten el llamado.”', '/F1', 12)
    builder.add_paragraph('Oracion opcional tras cada decena: “Oh Jesus, Sumo Sacerdote, atrae hacia Vos a muchos jovenes, hacelos generosos y firmes en la respuesta.”', '/F1', 12)
    builder.add_paragraph('Letania breve: Jesus, Pastor eterno; Maria de Guadalupe; San Jose custodio de las vocaciones.', '/F1', 12)
    builder.add_paragraph('Oracion conclusiva: “Senor, llama a muchos, sosten a quienes responden y concedeles perseverancia.”', '/F1', 12, extra_space=10)

    builder.add_paragraph('3. Letanias por las vocaciones (uso comunitario)', '/F2', 14, extra_space=8)
    builder.add_paragraph('Senor, ten piedad… Cristo, ten piedad… Cristo, oyenos… Cristo, escuchanos. Dios Padre misericordioso, ten piedad de nosotros. Dios Hijo, Pastor de la Iglesia, ten piedad de nosotros. Dios Espiritu Santo, que encendes el llamado, ten piedad de nosotros.', '/F1', 12)
    builder.add_paragraph('Santa Maria de Guadalupe, ruega por nosotros. San Jose, custodio de Jesus, ruega por nosotros. Santos apostoles y pastores de la Iglesia, rueguen por nosotros.', '/F1', 12)
    builder.add_paragraph('Para que suscites vocaciones, te rogamos, oyenos. Para que sostengas a los seminaristas, te rogamos, oyenos. Para que fortalezcas a los formadores, te rogamos, oyenos. Para que santifiques a los sacerdotes y hagas de nuestras familias semillero de vocaciones, te rogamos, oyenos.', '/F1', 12)
    builder.add_paragraph('Padre Nuestro… Oracion final: “Dios todopoderoso, que queres la salvacion de todos, despierta y cuida las vocaciones sacerdotales en tu Iglesia, especialmente en nuestro Seminario Metropolitano Nuestra Senora de Guadalupe. Amen.”', '/F1', 12, extra_space=10)

    builder.add_paragraph('4. Adoracion eucaristica breve (15–20 min)', '/F2', 14, extra_space=6)
    builder.add_paragraph('Canto de exposicion o silencio (2 min); lectura breve (Jn 10, 11–16 o Lc 10, 1–2); meditacion guiada; intercesiones con respuesta “Envia, Senor, obreros a tu mies”; silencio (5 min); oracion por el Seminario; bendicion o cierre segun quien presida.', '/F1', 12, extra_space=10)

    builder.add_paragraph('5. Hora Santa por las vocaciones (60 min)', '/F2', 14, extra_space=6)
    builder.add_paragraph('Apertura (canto, monicion, intencion por el Seminario); Palabra (lecturas propuestas 1 Sam 3, Sal 23, Jn 21); silencio orante; testimonio o meditacion; Rosario vocacional (decenas por formadores, seminaristas y nuevas vocaciones); intercesiones y oracion final. Concluir con bendicion eucaristica si preside sacerdote, o con oracion y canto si preside laico.', '/F1', 12, extra_space=10)

    builder.add_paragraph('6. Oraciones especificas', '/F2', 14, extra_space=6)
    builder.add_paragraph('Oracion por el Seminario Metropolitano “Nuestra Senora de Guadalupe”; oracion de los padres por la vocacion de los hijos; oracion de los ninos/adolescentes; oracion por los sacerdotes; oracion personal de discernimiento; suplica a Nuestra Senora de Guadalupe por las vocaciones.', '/F1', 12, extra_space=10)

    builder.add_paragraph('7. Intercesiones para Misa / Laudes / Visperas', '/F2', 14, extra_space=6)
    builder.add_paragraph('Por la Iglesia universal, por el Seminario, por los jovenes llamados, por las familias, por los sacerdotes en dificultad y por todas las comunidades que sostienen las vocaciones.', '/F1', 12, extra_space=10)

    builder.add_paragraph('8. Esquema semanal sencillo', '/F2', 14, extra_space=6)
    builder.add_paragraph('Lunes: lectio (1 Sam 3) y jaculatorias. Miercoles: decena del Rosario por el Seminario. Viernes: adoracion breve o visita al Santisimo. Domingo: ofrecer la Misa por las vocaciones y rezar por el Rector y formadores.', '/F1', 12, extra_space=10)

    builder.add_paragraph('9. Novena a Nuestra Senora de Guadalupe', '/F2', 14, extra_space=6)
    builder.add_paragraph('Estructura diaria: señ al de la cruz, antifona “Maria de Guadalupe, Madre de la Iglesia…”, lectura breve, intencion del dia, oracion de la novena, Padre Nuestro, Ave Maria y Gloria.', '/F1', 12)
    builder.add_paragraph('Dias 1-9: Escucha; Disponibilidad; Perseverancia; Pureza y caridad pastoral; Formacion integral; Com union eclesial; Celo misionero; Santidad sacerdotal; Envio.', '/F1', 12)
    builder.add_paragraph('Oracion fija: “Virgen de Guadalupe, Madre y Reina, te consagramos el Seminario Metropolitano y pedimos por abundantes y santas vocaciones sacerdotales”.', '/F1', 12, extra_space=10)

    builder.add_paragraph('10. Bendicion final (si preside laico)', '/F2', 14, extra_space=6)
    builder.add_paragraph('“Senor, quedate con nosotros y hace fecundas estas suplicas. Bajo el amparo de Maria de Guadalupe confiamos en tu Providencia. En el nombre del Padre, del Hijo y del Espiritu Santo. Amen.” Si preside laico: hacer la Señal de la Cruz sin impartir bendicion sacramental.', '/F1', 12, extra_space=10)

    builder.add_paragraph('11. Sugerencias de publicacion', '/F2', 14, extra_space=6)
    builder.add_paragraph('Ofrecer la guia en PDF y version bolsillo; proponer un calendario (primer viernes: Hora Santa por las vocaciones); integrar un boton “Quiero rezar por el Seminario”; sumar contacto para quienes desean acompanamiento de discernimiento.', '/F1', 12, extra_space=12)

    builder.finish_page()

    parts = []
    objects = []
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")

    kids_refs = " ".join(f"{i+3} 0 R" for i in range(len(builder.pages)))
    objects.append(f"2 0 obj\n<< /Type /Pages /Kids [{kids_refs}] /Count {len(builder.pages)} >>\nendobj\n".encode())

    content_ids = []
    for index, page_stream in enumerate(builder.pages):
        page_id = index + 3
        content_id = index + 3 + len(builder.pages)
        content_ids.append(content_id)
        objects.append(f"{page_id} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents {content_id} 0 R /Resources << /Font << /F1 {3 + 2*len(builder.pages)} 0 R /F2 {4 + 2*len(builder.pages)} 0 R >> >> >>\nendobj\n".encode())

    for idx, page_stream in enumerate(builder.pages):
        content_id = idx + 3 + len(builder.pages)
        objects.append(f"{content_id} 0 obj\n<< /Length {len(page_stream)} >>\nstream\n".encode() + page_stream + b"\nendstream\nendobj\n")

    font_regular_id = 3 + 2 * len(builder.pages)
    font_bold_id = font_regular_id + 1

    objects.append(f"{font_regular_id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n".encode())
    objects.append(f"{font_bold_id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n".encode())

    pdf_parts = [b"%PDF-1.4\n"]
    offsets = [0]
    offset = len(pdf_parts[0])
    for body in objects:
        pdf_parts.append(body)
        offsets.append(offset)
        offset += len(body)

    xref_offset = offset
    xref = [f"xref\n0 {len(objects)+1}\n".encode(), b"0000000000 65535 f \n"]
    for off in offsets[1:]:
        xref.append(f"{off:010d} 00000 n \n".encode())

    trailer = f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode()

    pdf_bytes = b"".join(pdf_parts + xref + [trailer])
    output_path.write_bytes(pdf_bytes)

if __name__ == '__main__':
    output = Path('static/media/guia-oracion-vocaciones.pdf')
    output.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(output)
    print(f'PDF actualizado en {output}')
