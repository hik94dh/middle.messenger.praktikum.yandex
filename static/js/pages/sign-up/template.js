export const template = `<div class="container">
      <form action="#" class="form">
          <div>
              <h1 class="form-title">{{title}}</h1>
              {{#each inputs}}
                {{{input}}}
              {{/each}}
          </div>
          <div class="form-buttons_wrapper">
              {{{button}}}
              <a href="{{link.href}}" class="link-primary">
                  {{link.text}}
              </a>
          </div>
      </form>
    </div>`;
//# sourceMappingURL=template.js.map