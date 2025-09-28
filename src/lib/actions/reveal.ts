export type RevealDirection = 'left' | 'right' | 'up' | 'down';

export function reveal(
  node: HTMLElement,
  options: { direction?: RevealDirection; once?: boolean } = {}
) {
  const { direction = 'up', once = true } = options;

  node.classList.add('reveal');
  node.dataset.revealDirection = direction;

  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('is-revealed');
    return {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        node.classList.add('is-revealed');
        if (once) {
          observer.unobserve(node);
        }
      } else if (!once) {
        node.classList.remove('is-revealed');
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  observer.observe(node);

  return {
    update(newOptions: { direction?: RevealDirection }) {
      if (newOptions?.direction && newOptions.direction !== node.dataset.revealDirection) {
        node.dataset.revealDirection = newOptions.direction;
      }
    },
    destroy() {
      observer.unobserve(node);
    }
  };
}
