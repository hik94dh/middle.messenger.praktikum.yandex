export const template = `<div class="container">
    <div class="profile-wrapper">
        <div class="button-back_wrapper">
            {{{buttonBack}}}
        </div>
        <div class="container">
            <div class="profile-inner_wrapper">
                <div class="profile-image" id="{{changeImageId}}">
                    <span>{{imageText}}</span>
                </div>
                <h2 class="profile-name">{{name}}</h2>
                <form action="#">
                    <ul>
                    {{#if changePasswordShow}}
                            {{#each changePasswordList}}
                                <li><span>{{left}}</span> <span>{{{right}}}</span></li>
                            {{/each}}
                        {{else}}
                            {{#each dataList}}
                                <li><span>{{left}}</span> <span>{{{right}}}</span></li>
                            {{/each}}        
                    {{/if}}
                    </ul>
                </form>
                {{#if linksShow}}
                    <ul class="profile-links">
                        {{#each links}}
                            <li><a href="{{href}}" class="link-primary {{class}}"><span>{{text}}</span></a></li>
                        {{/each}}
                    </ul>
                {{else}}
                    {{{button}}}
                {{/if}}
            </div>
        </div>
    </div>
    {{{modal}}}
  </div>`;
