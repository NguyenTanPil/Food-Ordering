// 1: form
const forms = document.querySelectorAll('.form-container');
forms.forEach(form => {
    // form check
    handleFormCheck(form);
    // form select
    handleFormSelect(form);
});

function handleFormCheck(form) {
    const formCheckInputs = form.querySelectorAll('.form-check-input');
    formCheckInputs.forEach(input => {
        input.onclick = () => {
            if (input.type == 'radio') {
                removeAllRadios(input);
            }
            const stateCheck = input.nextElementSibling;
            stateCheck.classList.toggle('active');
        }
    });
}

function handleFormSelect(form) {
    const btnsSelect = form.querySelectorAll('.select-btn');
    btnsSelect.forEach(btn => {
        btn.onclick = () => {
            const formSelect = btn.parentElement;
            formSelect.classList.toggle('active');
            if (formSelect.classList.contains('active')) {
                handleDropdownMenu(formSelect, btn);
            }
        }
    });
}

function handleDropdownMenu(formSelect, btnSelect) {
    const items = formSelect.querySelectorAll('.dropdown-menu-item');
    items.forEach(item => {
        item.onclick = () => {
            formSelect.classList.remove('active');
            btnSelect.innerText = item.innerText;
            removeAllActiveItems(items);
            item.classList.add('active');
        };
    });
}

function removeAllRadios(input) {
    const formGroup = input.parentElement.parentElement;
    const states = formGroup.querySelectorAll('.state-check');
    states.forEach(state => {
        state.classList.remove('active');
    });
}

function removeAllActiveItems(items) {
    items.forEach(item => {
        item.classList.remove('active');
    });
}

// modal
const modals = document.querySelectorAll('.modal-container');
const btnsOpenModal = document.querySelectorAll('.btn-open-modal');

btnsOpenModal.forEach(btn => {
    btn.onclick = () => {
        const modal = document.querySelector(btn.dataset.id);
        modal.classList.add('active');
    };
});

modals.forEach(modal => {
    const btnClose = modal.querySelector('.btn-close-modal');
    btnClose.onclick = () => {
        modal.classList.remove('active');
    };
});

// filter checkboxes
function filterCheckboxes(filters) {
    filters.forEach(filter => {
        handleFilterCheckbox(filter);
    });
}

function handleFilterCheckbox(filter) {
    const filterCheckInputs = filter.querySelectorAll('.filter-check-input');
    filterCheckInputs.forEach(input => {
        input.onclick = () => {
            if (input.id == 'chk1') {
                checkAllLocations(input);
            }
            const stateCheck = input.nextElementSibling;
            stateCheck.classList.toggle('active');
            if (input.checked == false && input.classList.contains('location')) {
                const all = document.querySelector('#chk1');
                all.checked = false;
                all.nextElementSibling.classList.remove('active');
            }
        };
    });
}

function checkAllLocations(input) {
    const locations = document.querySelectorAll('.locations .location');
    if (input.checked) {
        locations.forEach(location => {
            location.checked = true;
            location.nextElementSibling.classList.add('active');
        });
    } else {
        locations.forEach(location => {
            location.checked = false;
            location.nextElementSibling.classList.remove('active');
        });
    }
}

// filter
function filters() {
    const btnsLocation = document.querySelectorAll('.locations input[type="checkbox"]');
    const btnsCategorie = document.querySelectorAll('.categories input[type="checkbox"]');
    const btnsCuisine = document.querySelectorAll('.cuisines input[type="checkbox"]');
    const btnsOffer = document.querySelectorAll('.offers input[type="checkbox"]');
    const btnsRating = document.querySelectorAll('.rating input[type="checkbox"]');
    const filters = {
        locations: getCheckedCheckboxes(btnsLocation),
        categories: getCheckedCheckboxes(btnsCategorie),
        cuisines: getCheckedCheckboxes(btnsCuisine),
        offers: getCheckedCheckboxes(btnsOffer),
        ratings: getCheckedCheckboxes(btnsRating),
    };
    const products = document.querySelectorAll('input[type="hidden"]');
    filterResults(filters, products);
}

function getCheckedCheckboxes(checkboxes) {
    const listChecked = [];
    if (checkboxes && checkboxes.length > 0) {
        checkboxes.forEach(cb => {
            if (cb.checked) {
                listChecked.push(cb.value);
            }
        });
    }
    return listChecked;
}

function filterResults(filters, products) {
    const hiddenEl = [];
    if (!products || products.length <= 0) {
        return;
    }
    products.forEach(product => {
        if (filters.locations.length > 0) {
            let isShowing = filters.locations.some(location => {
                return product.value.indexOf(location) >= 0;
            });
            if (!isShowing) {
                hiddenEl.push(product);
            }
        }
        if (filters.categories.length > 0) {
            let isShowing = filters.categories.some(category => {
                return product.value.indexOf(category) >= 0;
            });
            if (!isShowing) {
                hiddenEl.push(product);
            }
        }
        if (filters.cuisines.length > 0) {
            let isShowing = filters.cuisines.some(cuisine => {
                return product.value.indexOf(cuisine) >= 0;
            });
            if (!isShowing) {
                hiddenEl.push(product);
            }
        }
        if (filters.offers.length > 0) {
            let isShowing = filters.offers.some(offer => {
                return product.value.indexOf(offer) >= 0;
            });
            if (!isShowing) {
                hiddenEl.push(product);
            }
        }
        if (filters.ratings.length > 0) {
            let isShowing = filters.ratings.some(rating => {
                return product.value.indexOf(rating) >= 0;
            });
            if (!isShowing) {
                hiddenEl.push(product);
            }
        }
    });
    products.forEach(product => {
        if (product.parentElement.classList.contains('card')) {
            product.parentElement.parentElement.style.display = 'block';
        } else {
            product.parentElement.style.display = 'block';
        }
    });
    if (hiddenEl.length <= 0) {
        return;
    }
    hiddenEl.forEach(el => {
        if (el.parentElement.classList.contains('card')) {
            el.parentElement.parentElement.style.display = 'none';
        } else {
            el.parentElement.style.display = 'none';
        }
    });
}

// height filters
function setHeightAccordionItem(accordions) {
    accordions.forEach((accordion) => {
        const btnFilter = accordion.querySelector('.filters-dropdown');
        const containerCollapse = accordion.querySelector('.container-collapse');
        const collapse = accordion.querySelector('.collapse');
        handleSetHeight(btnFilter, containerCollapse, collapse);
    });
}

function handleSetHeight(btnFilter, containerCollapse, collapse) {
    btnFilter.onclick = () => {
        const collapseHeight = collapse.getBoundingClientRect().height;
        const collapseContainerHeight = containerCollapse.getBoundingClientRect().height;
        if (collapseContainerHeight == 0) {
            containerCollapse.style.height = `${collapseHeight}px`;
            btnFilter.style.paddingBottom = '0.5rem';
        } else {
            containerCollapse.style.height = `0`;
            btnFilter.style.paddingBottom = '1rem';
        }
    }
}

// count stars
function countStar(parent, numberStar) {
    const stars = parent.querySelector('.rating');
    let n = parseFloat(numberStar);
    let star;
    const container = [];
    for (let index = 1; index <= 5; index++) {
        if (index <= n) {
            star = 'fa-star';
        } else if (index > n && index < n) {
            star = 'fa-star-half-o';
        } else {
            star = 'fa-star-o';
        }
        container.push(`<i class="fa ${star}" aria-hidden="true"></i>`);
    }
    container.push(`<span>${numberStar}.0</span>`);
    stars.innerHTML = container.join('');
}

// save input hidden
function saveInputHidden(element, input) {
    input.value = element.innerText.trim();
}

// nab tav
const navTabs = Array.from(document.querySelectorAll('.nav-tab'));
navTabs.forEach(navTab => {

    const idNavContent = navTab.dataset.id;
    const navContent = document.querySelector(idNavContent);
    handleBtnNavTabClick(navTab, navContent);

});

// function handle change tab when click btn
function handleBtnNavTabClick(navTab, navContent) {
    const btns = Array.from(navTab.querySelectorAll('.nav-tab-btn'));

    btns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();

            // nav tab
            removeActiveTabItem(navTab, '.nav-tab-btn');
            activeTabItem(btn);

            // tab content
            const idTabPane = btn.dataset.id;
            const tabPane = navContent.querySelector(idTabPane);
            removeActiveTabItem(navContent, '.tab-pane');
            activeTabItem(tabPane);
        }
    });
}

// function remove active nav items
function removeActiveTabItem(navContainer, selector) {
    const btn = navContainer.querySelector(selector + '.active');
    btn.classList.remove('active');
}

// function active nav btn 
function activeTabItem(element) {
    element.classList.add('active');
}

// find parent element
function findParentElement(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.classList.contains(selector)) {
            return element.parentElement
        }
        element = element.parentElement;
    }
}
