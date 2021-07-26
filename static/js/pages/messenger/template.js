export const template = `
<div class="chat-page_wrapper">
    <div class="sidebar_wrapper">
        <a href="profile" class="sidebar-link">{{profile}}</a>
        <div class="sidebar-search">
            <input type="text" placeholder="{{searchPlaceholder}}">
        </div>
        
        <div class="sidebar-chats_wrapper">
        {{#each chats}}
            <div class="sidebar-chat {{isActive}}">
              <div class="sidebar-chat_image"></div>
              <div class="sidebar-chat_text">
                <h4>{{name}}</h4>
                <p>
                {{#if messageBold}}
                    <b>{{messageBold}}</b>
                {{/if}}
                {{message}}
                </p>
              </div>
              <div class="sidebar-chat_data">
                <div class="sidebar-chat_data-time">{{time}}</div>
                {{#if messagesCount}}
                <div class="sidebar-chat_data-messages">{{messagesCount}}</div>
                {{/if}}
              </div>
            </div>
        {{/each}}
        </div>
    </div>
    
    <div class="chat-dialog">
    {{#if chat.isOpen}}
        <div class="chat-dialog_header">
            <nav>
              <a href="#" class="chat-dialog_header-link">
                <span class="chat-dialog_header-image"></span>
                <span class="chat-dialog_header-name">{{headerName}}</span>
              </a>
              <a href="#" class="chat-dialog_header-link">
                <span class="chat-dialog_header-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
              </a>
              <div class="chat-dialog_header-dots-block popper">
                <ul>
                  <li id="addUser">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                    <span>Добавить пользователя</span>
                  </li>
                  <li id="removeUser">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                    <span>Удалить пользователя</span>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
        <div class="chat-dialog_messages">
        <div class="chat-dialog_messages-time">{{chat.time}}</div>
        
        {{#each messages}}
            {{#if image}}
            <div class="chat-dialog_message-item-image">
                <img src="{{image}}">
                <span class="chat-dialog_message-item-time">
                {{time}}
                </span>
            </div>
            {{else}}
               <div class="chat-dialog_message-item {{class}}">{{text}}
                    <span class="chat-dialog_message-item-time {{classForTime}}">
                    {{#if icon}}
                        <svg width="12" height="6" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66648 6.87477L10.2103 0.139168C10.3908 -0.0463894 10.6839 -0.0463894 10.8643 0.139168C11.0452 0.324251 11.0452 0.62513 10.8643 0.810213L3.99532 7.88086C3.8167 8.06405 3.51946 8.06405 3.34084 7.88086L0.135337 4.60679C-0.0451125 4.42171 -0.0451125 4.1213 0.135337 3.93575C0.315787 3.75019 0.608904 3.75019 0.789354 3.93575L3.66648 6.87477ZM7.14111 7.06654L14.1548 0.139864C14.3479 -0.0466214 14.6616 -0.0466214 14.8548 0.139864C15.0484 0.325873 15.0484 0.628256 14.8548 0.814264L7.55877 8.13855C7.3676 8.32265 5.87166 7.56707 5.75484 7.46285C5.64238 7.36252 6.30121 6.77489 6.30121 6.77489C6.50611 6.87518 7.08691 7.12008 7.14111 7.06654Z" fill="#0C8FE4"/>
                        </svg>
                    {{/if}}
                    {{time}}
                    </span>
                </div>
            {{/if}}
        {{/each}}
        </div>

        <div class="chat-dialog_footer-attach-block popper">
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/></svg>
            <span>Фото или Видео</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            <span>Файл</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>
            <span>Локация</span>
          </li>
        </ul>
        </div>
        <div class="chat-dialog_footer">
        <div class="chat-dialog_footer-attach">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
        </div>
        <textarea name="message" class="chat-dialog_footer-field" placeholder="{{textareaPlaceholder}}"></textarea>
        {{{buttonEnter}}}
        </div>
    {{else}}
        <div class="chat-dialog_empty">
            {{chat.emptyChatMessage}}
        </div>
    {{/if}}
    </div>
</div>
{{{modal}}}

`;
//# sourceMappingURL=template.js.map