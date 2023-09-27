function calcFontSizes(props) {
    if(!props) {props = {}}

    const fontSizes = [];
    const fontSizesGetLast = (array) => array[array.length-1];
    
    console.log(props);

    let { fontBaseSize, fontScale, fontCount } = props;

    for(i = 0; i < fontCount; i++) {
        if (fontSizes.length === 0) {
            fontSizes.push(fontBaseSize*fontScale);
        } else {
            fontSizes.push(fontSizesGetLast(fontSizes)*fontScale);
        }
    }

    return fontSizes.reverse();
}

function renderFontList($mainLayout, fontSizesArr) {

    const renderNode = (props) => {

        const el = document.createElement(props.el);
        if (props.class) el.classList = props.class;
        if (props.text) el.innerText = props.text;

        return el;
    };
    
    const convertToPX = (fontSize) => fontSize.toFixed(2)+'px';
    const convertToREM = (fontSize) => (fontSize*0.0625).toFixed(3)+'rem';

    $mainLayout.innerHTML = '';

    fontSizesArr.forEach(fontSize => {

        const $fontWrapper = renderNode({ el: 'div', class: 'list_item' });
        const $fontSize = renderNode({ el: 'div', class: 'list_item_size', text: convertToREM(fontSize)+'/'+convertToPX(fontSize) });
        const $fontDisplay = renderNode({ el: 'div', class: 'list_item_font', text: 'A Visual Type Scale' });

        $fontDisplay.style.fontSize = convertToPX(fontSize);

        $fontWrapper.append($fontSize, $fontDisplay);
        $mainLayout.append($fontWrapper);        
    });
}

function main() {
    const $ = (el) => document.querySelectorAll(el)[0];

    const formInputBaseSize = $('#formInputBaseSize');
    const formSelectScale = $('#formSelectScale');
    const formInputCount = $('#formInputCount');
    const formButtonReset = $('#formButtonReset');

    const mainFontList = $('#tc_list');

    let defaultValues = {
        fontBaseSize: formInputBaseSize.value,
        fontScale: formSelectScale.value,
        fontCount: formInputCount.value
    };

    renderFontList(mainFontList, calcFontSizes(defaultValues))

    formInputBaseSize.addEventListener('input', function() {
        defaultValues['fontBaseSize'] = this.value;
        renderFontList(mainFontList, calcFontSizes(defaultValues))
    });

    formSelectScale.addEventListener('change', function() {
        defaultValues['fontScale'] = this.value;
        renderFontList(mainFontList, calcFontSizes(defaultValues))
    });

    formInputCount.addEventListener('change', function() {
        defaultValues['fontCount'] = this.value;
        renderFontList(mainFontList, calcFontSizes(defaultValues))
    });

    formButtonReset.addEventListener('click', function() {
        renderFontList(mainFontList, calcFontSizes({
            fontBaseSize: '16',
            fontScale: '1.250',
            fontCount: '8'
        }));
        
        formInputBaseSize.value = '16';
        formSelectScale.value = '1.250';
        formInputCount.value = '8';
    });

}


document.addEventListener('DOMContentLoaded', () => {
    main();
});