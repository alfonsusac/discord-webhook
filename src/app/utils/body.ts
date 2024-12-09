export function addBodyOverflowHidden(id: string) {
  const list = document.body.getAttribute('data-freeze-scroll')
    ?.split(',')
    .filter(str => str !== '')
    || []
  
  if (!list.includes(id)) {
    list.push(id)
    document.body.setAttribute('data-freeze-scroll', list.join(','))
  }
  if (document.body.style.overflow !== 'hidden') {
    document.body.style.overflow = 'hidden';
  }
}

export function removeBodyOverflowHidden(id: string) {
  const list = document.body.getAttribute('data-freeze-scroll')
    ?.split(',')
    .filter(str => str !== '')
    || []

  const index = list.indexOf(id)
  if (index !== -1) {
    list.splice(index, 1)
    document.body.setAttribute('data-freeze-scroll', list.join(','))
  }
  if (list.length === 0 && document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
}