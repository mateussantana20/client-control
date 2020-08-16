//Abrir modal para editar user
// const closeModal = document.querySelector('.close-modal');
// const editOrDeleteUserButtons = document.querySelectorAll('.open-modal');
// const modalOverlay = document.querySelector('.modal-overlay')


// for(let editOrDeleteUserButton of editOrDeleteUserButtons) {
//   editOrDeleteUserButton.addEventListener("click", function()  {
//     modalOverlay.classList.add('active');
//   })
// }
// closeModal.addEventListener('click',() => {
//   modalOverlay.classList.remove('active');

// })


function paginate(selectedpage,totalPages ) {
  // let totalPages = 20 
  // let selectedpage = 5
  let pages = []
  let oldPage

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectePage = currentPage <= selectedpage + 2 
    const pagesBeforeSelectePage = currentPage >= selectedpage - 2

    if(firstAndLastPage || pagesBeforeSelectePage && pagesAfterSelectePage) {
      
      if(oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      } 

      pages.push(currentPage) 
      oldPage = currentPage
    }
  }

  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages =  paginate(page, total)
  
  let elements = ""
  
  for(let page of pages) {
    if(String(page).includes('...')) {
      elements += `<span>${page}<span/>`
    } else { 
      if(filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}<a/>`
      }else {
        elements += `<a href="?page=${page}">${page}<a/>`
      }
  
    }
  }
  
  pagination.innerHTML = elements
  
}

const pagination = document.querySelector(".pagination")

if(pagination) {
  createPagination(pagination)
}
