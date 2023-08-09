import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".user");
  _errorContainer = this._parentElement;

  _generateMarkup() {
    const formatDate = function (rawDate) {
      const day = rawDate.slice(8, 10);
      const month = new Date(rawDate).toString().slice(4, 7);
      const year = rawDate.slice(0, 4);
      const dateStr = `${day} ${month} ${year}`;
      return dateStr;
    };

    const checkAvailabilityText = function (entry) {
      return entry ? entry : `Not available`;
    };

    const checkAvailabilityClass = function (entry) {
      return entry ? "" : `class="unavailable"`;
    };

    return `
    <img src="${this._data.avatarUrl}" alt="The avatar of ${this._data.name}" />
    <div class=user__personal>
      <h3 class="user__name">${
        this._data.name ? this._data.name : this._data.userName
      }</h3>
      <a href="https://github.com/${
        this._data.userName
      }" class="user__username" target="_blank">@${this._data.userName}</a>
      <p class="user__regdate">Joined ${formatDate(this._data.regDate)}</p>
    </div>
    <p class="user__bio">
      ${this._data.bio ? this._data.bio : "This profile has no bio"}
    </p>
    <ul class="user__stats">
      <li>
        <h4>Repos</h4>
        <p>${this._data.repos}</p>
      </li>
      <li>
        <h4>Followers</h4>
        <p>${this._data.followers}</p>
      </li>
      <li>
        <h4>Following</h4>
        <p>${this._data.following}</p>
      </li>
    </ul>
    <ul class="user__links">
      <li ${checkAvailabilityClass(this._data.location)}>
        <span class="user__icon user__icon--location"></span>
        <span>
          ${checkAvailabilityText(this._data.location)}
        </span>
      </li>
      <li ${checkAvailabilityClass(this._data.blog)}>
        <span class="user__icon user__icon--blog"></span>
        <a ${
          this._data.blog ? `href="${this._data.blog}` : ""
        }" target="_blank">
          ${checkAvailabilityText(this._data.blog)}
        </a>
      </li>
      <li ${checkAvailabilityClass(this._data.twitter)}>
        <span class="user__icon user__icon--twitter"></span>
        <a ${
          this._data.twitter
            ? `href="https://twitter.com/${this._data.twitter}"`
            : ""
        } target="_blank">
          ${checkAvailabilityText(this._data.twitter)}
        </a>
      </li>
      <li ${checkAvailabilityClass(this._data.company)}>
        <span class="user__icon user__icon--company"></span>
        <a ${
          this._data.company
            ? `href="https://github.com/${this._data.company.slice(1)}"`
            : ""
        } target="_blank">
          ${checkAvailabilityText(this._data.company)}
        </a>
      </li>
    </ul>
    `;
  }
}

export default new UserView();
