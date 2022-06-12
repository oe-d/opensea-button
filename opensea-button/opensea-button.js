// OpenSea Button 1.1.1
// https://github.com/oe-d/opensea-button

var page = '';
var tt_1;

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

function set_tt_1_style(tt_1_rect) {
    btn_2_rect = btn_2.getBoundingClientRect();
    btn_2_center = btn_2_rect.left + (btn_2_rect.right - btn_2_rect.left) / 2;
    tt_1_x = Math.round(btn_2_center - ((tt_1_rect.right - tt_1_rect.left) / 2));
    tt_1_y = Math.floor(btn_2_rect.top - (tt_1_rect.bottom - tt_1_rect.top));
    tt_1.setAttribute('style', 'position: absolute; transform: translate3d(' + tt_1_x + 'px, ' + tt_1_y + 'px, 0px); top: 0px; left: 0px; will-change: transform;');
}

function create_elements(btn_container) {
    btn_1 = document.createElement('span');
    btn_2 = document.createElement('a');
    btn_3 = document.createElement('img');

    btn_2.appendChild(btn_3);
    btn_1.appendChild(btn_2);
    btn_container.appendChild(btn_1);

    tt_1 = document.createElement('div');
    tt_2 = document.createElement('div');
    tt_3 = document.createElement('div');

    tt_1.appendChild(tt_2);
    tt_1.appendChild(tt_3);
    document.body.appendChild(tt_1);

    btn_2.setAttribute('class', 'ml-1 btn btn-sm btn-icon btn-soft-primary rounded-circle');
    btn_2.setAttribute('href', get_os_url());

    btn_2.addEventListener('mouseover', function () {
        tt_1.setAttribute('class', 'tooltip fade bs-tooltip-top show');
    });

    btn_2.addEventListener('mouseleave', function () {
        tt_1.setAttribute('class', 'tooltip fade bs-tooltip-top');
    });

    btn_3.setAttribute('class', 'img-fluid rounded-circle');
    btn_3.setAttribute('src', chrome.runtime.getURL('opensea-logo.svg'));

    tt_3.setAttribute('class', 'tooltip-inner');
    tt_3.textContent = 'View on OpenSea';

    tt_1.setAttribute('class', 'tooltip bs-tooltip-top');
    tt_1_rect = tt_1.getBoundingClientRect();
    set_tt_1_style(tt_1_rect);
    tt_1.setAttribute('x-placement', 'top');

    tt_2.setAttribute('class', 'arrow');
    tt_2_rect = tt_2.getBoundingClientRect();
    tt_2_x = (tt_1_rect.right - tt_1_rect.left) / 2 - ((tt_2_rect.right - tt_2_rect.left) / 2);
    tt_2.setAttribute('style', 'left: ' + tt_2_x + 'px;');
}

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

if (page.length > 0) {
    nodes = document.getElementsByClassName('mb-3 mb-lg-0')[0].firstChild.nextSibling.childNodes;
    container = nodes[page == 'token' ? 3 : 5];
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

    create_elements(container);
    window.addEventListener('resize', function () { set_tt_1_style(tt_1.getBoundingClientRect()) });
}
