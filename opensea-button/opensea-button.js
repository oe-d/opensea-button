// OpenSea Button 1.0.0
// https://github.com/oe-d/opensea-button

page = '';

if (window.location.pathname.substr(0, 6) == '/token') {
    page = 'token';
} else {
    icon = document.getElementById('icon');

    if (icon) {
        if (icon.nextSibling.textContent.includes('Contract')) {
            page = 'contract';
        } else if (icon.nextSibling.textContent.includes('Address')) {
            page = 'address';
        }
    }
}

function get_os_url() {
    href = window.location.href;
    os_url = 'https://';

    if (href.search('rinkeby') > 0) {
        os_url += 'testnets.';
    }

    os_url += 'opensea.io/';

    if (page != 'address') {
        os_url += 'assets?search[query]=';
    }

    return os_url + href.substr(href.search('0x'), 42);
}

if (page.length > 0) {
    os_url = get_os_url();
    os_logo = chrome.runtime.getURL('opensea-logo.svg');

    el_1 = document.createElement('span');
    el_2 = document.createElement('a');
    el_3 = document.createElement('img');

    el_2.setAttribute('class', 'ml-1 btn btn-sm btn-icon btn-soft-primary rounded-circle');
    el_2.setAttribute('href', os_url);

    el_3.setAttribute('class', 'img-fluid rounded-circle');
    el_3.setAttribute('src', os_logo);

    el_2.appendChild(el_3);
    el_1.appendChild(el_2);

    nodes = document.getElementsByClassName('mb-3 mb-lg-0')[0].firstChild.nextSibling.childNodes;
    container = nodes[page == 'token' ? 3 : 5];
    container.appendChild(el_1);
    bc_node = container.getElementsByClassName('mr-1 ml-2');

    if (bc_node[0]) {
        bc_node[0].setAttribute('class', 'ml-1');
    }

    if (page != 'token') {
        a_list = container.getElementsByTagName('a');

        for (i = 0; i < a_list.length; i++) {
            if (a_list[i].href.includes('blockscan.com/address')) {
                a_list[i].setAttribute('class', 'ml-1 btn btn-sm btn-icon btn-soft-secondary rounded-circle');
                a_list[i].parentNode.setAttribute('class', 'mr-1');
            }
        }
    }
}
