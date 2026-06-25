javascript:(function(){
    if(document.getElementById('wii-eta-panel')){
        document.getElementById('wii-eta-panel').remove();
        return;
    }

    alert("📍 Click anywhere on the Education Perfect page to place the Wii ETA window");

    var isSelecting = true;
    document.body.style.cursor = 'crosshair';

    function clickHandler(e){
        if(!isSelecting) return;
        
        e.preventDefault();
        e.stopImmediatePropagation();
        isSelecting = false;
        document.body.style.cursor = 'default';
        document.removeEventListener('click', clickHandler, true);

        var x = Math.round(e.clientX - 240); // center the panel
        var y = Math.round(e.clientY - 40);

        // Highlight the clicked area briefly
        var highlight = document.createElement('div');
        highlight.style.position = 'fixed';
        highlight.style.left = (e.clientX - 10) + 'px';
        highlight.style.top = (e.clientY - 10) + 'px';
        highlight.style.width = '20px';
        highlight.style.height = '20px';
        highlight.style.border = '3px solid #238636';
        highlight.style.borderRadius = '50%';
        highlight.style.pointerEvents = 'none';
        highlight.style.zIndex = '99999998';
        document.body.appendChild(highlight);
        setTimeout(() => highlight.remove(), 800);

        openWiiPanel(x, y);
    }

    document.addEventListener('click', clickHandler, true);

    function openWiiPanel(x, y){
        var style = document.createElement('style');
        style.innerHTML = `
            #wii-eta-panel{
                position:fixed;
                left:${x}px;
                top:${y}px;
                width:480px;
                height:620px;
                background:#fff;
                border:4px solid #182552;
                border-radius:12px;
                box-shadow:0 15px 40px rgba(0,0,0,0.4);
                z-index:99999999;
                overflow:hidden;
                display:block;
            }
            #wii-eta-header{
                background:#182552;
                color:white;
                padding:12px 16px;
                font-weight:bold;
                font-size:16px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                cursor:move;
            }
            #wii-eta-frame{
                width:100%;
                height:calc(100% - 48px);
                border:none;
            }
        `;
        document.head.appendChild(style);

        var panel = document.createElement('div');
        panel.id = 'wii-eta-panel';

        var header = document.createElement('div');
        header.id = 'wii-eta-header';
        header.innerHTML = `Wii ETA Helper <span style="cursor:pointer;font-size:22px;" onclick="document.getElementById('wii-eta-panel').remove()">✕</span>`;
        panel.appendChild(header);

        var iframe = document.createElement('iframe');
        iframe.id = 'wii-eta-frame';
        iframe.src = 'https://wii-eta.vercel.app/';
        panel.appendChild(iframe);

        document.body.appendChild(panel);

        // Draggable (mouse + touch)
        let dragging = false, offsetX, offsetY;
        header.addEventListener('mousedown', e => {
            if(e.target.tagName === 'SPAN') return;
            dragging = true;
            offsetX = e.clientX - panel.offsetLeft;
            offsetY = e.clientY - panel.offsetTop;
        });
        header.addEventListener('touchstart', e => {
            dragging = true;
            offsetX = e.touches[0].clientX - panel.offsetLeft;
            offsetY = e.touches[0].clientY - panel.offsetTop;
        });

        document.addEventListener('mousemove', e => {
            if(!dragging) return;
            panel.style.left = (e.clientX - offsetX) + 'px';
            panel.style.top = (e.clientY - offsetY) + 'px';
        });
        document.addEventListener('touchmove', e => {
            if(!dragging) return;
            panel.style.left = (e.touches[0].clientX - offsetX) + 'px';
            panel.style.top = (e.touches[0].clientY - offsetY) + 'px';
        });

        document.addEventListener('mouseup', () => dragging = false);
        document.addEventListener('touchend', () => dragging = false);
    }
})();
