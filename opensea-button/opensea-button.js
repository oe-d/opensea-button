// OpenSea Button 1.1.2
// https://github.com/oe-d/opensea-button

var page;
var e = {};

function get_os_url() {
    const href = window.location.href;
    let os_url = 'https://';

    if (href.search('rinkeby') > 0) {
        os_url += 'testnets.';
    }

    os_url += 'opensea.io/';

    if (page != 'address') {
        os_url += 'assets?search[query]=';
    }

    return os_url + href.substr(href.search('0x'), 42);
}

function set_tt_1_attributes() {
    let tt_1_class = 'tooltip fade bs-tooltip-top';
    let tt_1_x_placement = 'top';
    const tt_1_rect = e.tt_1.getBoundingClientRect();
    const btn_2_rect = e.btn_2.getBoundingClientRect();
    const btn_2_center = btn_2_rect.left + (btn_2_rect.right - btn_2_rect.left) / 2;
    const tt_1_half_width = (tt_1_rect.right - tt_1_rect.left) / 2;
    const tt_1_height = tt_1_rect.bottom - tt_1_rect.top;
    const tt_1_x = Math.round(btn_2_center - tt_1_half_width);
    let tt_1_y = Math.round(btn_2_rect.top - tt_1_height + document.documentElement.scrollTop);

    if (tt_1_y - document.documentElement.scrollTop < 4) {
        tt_1_class = 'tooltip fade bs-tooltip-bottom';
        tt_1_x_placement = 'bottom';
        tt_1_y = Math.round(btn_2_rect.bottom + document.documentElement.scrollTop);
    }

    e.tt_1.setAttribute('class', tt_1_class);
    e.tt_1.setAttribute('x-placement', tt_1_x_placement);
    e.tt_1.setAttribute('style', 'position: absolute; transform: translate3d(' + tt_1_x + 'px, ' + tt_1_y + 'px, 0px); top: 0px; left: 0px; will-change: transform;');
}

function create_elements() {
    e.btn_1 = document.createElement('span');
    e.btn_2 = document.createElement('a');
    e.btn_3 = document.createElement('img');

    e.btn_2.appendChild(e.btn_3);
    e.btn_1.appendChild(e.btn_2);
    e.container.appendChild(e.btn_1);

    e.tt_1 = document.createElement('div');
    e.tt_2 = document.createElement('div');
    e.tt_3 = document.createElement('div');

    e.tt_1.setAttribute('class', 'tooltip fade bs-tooltip-top');

    e.tt_1.appendChild(e.tt_2);
    e.tt_1.appendChild(e.tt_3);
    document.body.appendChild(e.tt_1);

    e.btn_2.setAttribute('class', 'ml-1 btn btn-sm btn-icon btn-soft-primary rounded-circle');
    e.btn_2.setAttribute('href', get_os_url());

    e.btn_2.addEventListener('mouseover', function () {
        e.tt_1.setAttribute('class', e.tt_1.getAttribute('class') + ' show');
    });

    e.btn_2.addEventListener('mouseleave', function () {
        let tt_1_class = e.tt_1.getAttribute('class');
        e.tt_1.setAttribute('class', tt_1_class.substr(0, tt_1_class.search(' show')));
    });

    e.btn_3.setAttribute('class', 'img-fluid rounded-circle');
    e.btn_3.setAttribute('src', chrome.runtime.getURL('opensea-logo.svg'));

    e.tt_3.setAttribute('class', 'tooltip-inner');
    e.tt_3.textContent = 'View on OpenSea';

    set_tt_1_attributes();

    e.tt_2.setAttribute('class', 'arrow');
    const tt_1_rect = e.tt_1.getBoundingClientRect();
    const tt_2_rect = e.tt_2.getBoundingClientRect();
    const tt_2_x = (tt_1_rect.right - tt_1_rect.left) / 2 - (tt_2_rect.right - tt_2_rect.left) / 2;
    e.tt_2.setAttribute('style', 'left: ' + tt_2_x + 'px;');
}

if (window.location.pathname.substr(0, 6) == '/token') {
    page = 'token';
} else {
    const icon = document.getElementById('icon');

    if (icon) {
        if (icon.nextSibling.textContent.includes('Contract')) {
            page = 'contract';
        } else if (icon.nextSibling.textContent.includes('Address')) {
            page = 'address';
        }
    }
}

if (page.length > 0) {
    const nodes = document.getElementsByClassName('mb-3 mb-lg-0')[0].firstChild.nextSibling.childNodes;
    e.container = nodes[page == 'token' ? 3 : 5];
    const bc_node = e.container.getElementsByClassName('mr-1 ml-2');

    if (bc_node[0]) {
        bc_node[0].setAttribute('class', 'ml-1');
    }

    if (page != 'token') {
        const a_list = e.container.getElementsByTagName('a');

        for (let i = 0; i < a_list.length; i++) {
            if (a_list[i].href.includes('blockscan.com/address')) {
                a_list[i].setAttribute('class', 'ml-1 btn btn-sm btn-icon btn-soft-secondary rounded-circle');
                a_list[i].parentNode.setAttribute('class', 'mr-1');
            }
        }
    }

    create_elements();

    window.addEventListener('resize', set_tt_1_attributes);
    window.addEventListener('scroll', set_tt_1_attributes);
}
