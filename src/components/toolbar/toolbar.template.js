import {toolbarButtons} from '@/components/toolbar/toolbar.buttons';

function createButton(button){
    return `<div class="button ${button.active ? 'active' : ''}" data-event_click="onButtonClick" data-action="${button.action}">
        <i class="material-icons" data-event_click="onButtonClick" data-action="${button.action}">${button.icon}</i>
    </div>`;
}

export function createToolbar(state = {}) {
    let buttons = toolbarButtons;
    for (const key of Object.keys(buttons)) {
        buttons[key].active = state[key] || false;
    }
    
    return Object.values(buttons).map(createButton).join('');
}

export function getToolbarButtons() {
    return toolbarButtons;
}