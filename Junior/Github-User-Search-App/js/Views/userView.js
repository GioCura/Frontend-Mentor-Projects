import View from "./view.js";
import { iconLocation, iconBlog, iconTwitter, iconCompany } from "../config.js";

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

    const checkAvailabilityClass = function (entry) {
      return entry ? "" : `class="unavailable"`;
    };

    const checkAvailabilityText = function (entry) {
      return entry ? entry : `Not available`;
    };

    const checkAvailabilityLink = function (entry, link) {
      const content = checkAvailabilityText(entry);
      if (!link) link = entry;
      return entry
        ? `<a href="${link}" target="_blank">${content}</a>`
        : `<p>${content}</p>`;
    };

    const checkAvailabilityCompanyLink = function (entry) {
      const content = checkAvailabilityText(entry);
      return entry.charAt(0) === `@`
        ? `<a href="https://github.com/${
            entry.slice(1).split(" ")[0]
          }" target="_blank">${content}</a>`
        : `<p>${content}</p>`;
    };

    return `
    <img src="${this._data.avatarUrl}" alt="The avatar of ${
      this._data.name
    }" width="70" height="70"/>
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
        <h4 class="sr-only">Location</h4>
        ${iconLocation}
        <p>
          ${checkAvailabilityText(this._data.location)}
        </p>
      </li>
      <li ${checkAvailabilityClass(this._data.blog)}>
        <h4 class="sr-only">Blog</h4>
        ${iconBlog}
        ${checkAvailabilityLink(this._data.blog)}
      </li>
      <li ${checkAvailabilityClass(this._data.twitter)}>
        <h4 class="sr-only">Twitter</h4>
        ${iconTwitter}
        ${checkAvailabilityLink(
          this._data.twitter,
          `https://www.twitter.com/${this._data.twitter}`
        )}
      </li>
      <li ${checkAvailabilityClass(this._data.company)}>
        <h4 class="sr-only">Company</h4>
        ${iconCompany}
        ${checkAvailabilityCompanyLink(this._data.company)}
      </li>
    </ul>
    `;
  }
}

export default new UserView();
