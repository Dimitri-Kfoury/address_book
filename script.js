const detailsDiv = document.querySelector(".details"); 

const contactsList = document.querySelector("#contacts-list"); 
const orgsList = document.querySelector("#organizations-list"); 

const peopleDetailsDiv = detailsDiv.querySelector("#people-details"); 
const firstNameTextArea = detailsDiv.querySelector("#first-name-text-area");
const lastNameTextArea = detailsDiv.querySelector("#last-name-text-area"); 
const emailTextArea = detailsDiv.querySelector("#email-text-area"); 
const addressTextArea = detailsDiv.querySelector("#address-text-area")
const telephoneNumberTextArea = detailsDiv.querySelector(
  "#telephone-number-text-area"
); 
const organizationTextArea = detailsDiv.querySelector(
  "#organization-text-area"
); 

const organizationDetailsDiv = detailsDiv.querySelector(
  "#organization-details"
);
const organizationName = detailsDiv.querySelector(
  "#organization-name-text-area"
);
const organizationEmail = detailsDiv.querySelector(
  "#organization-email-text-area"
);
const organizationTelephoneNumber = detailsDiv.querySelector(
  "#organization-telephone-number-text-area"
);
const organizationAddress = detailsDiv.querySelector(
  "#organization-address-text-area");


const selectPeopleButton = document.querySelector("#select-people-button");
const selectOrgsButton = document.querySelector("#select-orgs-button");

const bgUserModal = document.querySelector(".bg-user-modal");
const bgOrgModal = document.querySelector(".bg-org-modal");

const searchInput = document.querySelector("#contact-search-input");

const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const editButton = document.querySelector("#edit-button");

const peopleEditButtonContainer = document.querySelector(
  "#people-edit-buttons-container"
);
const orgsEditButtonContainer = document.querySelector(
  "#orgs-edit-buttons-container"
);

const peopleSaveButton = peopleEditButtonContainer.querySelector(
  "#people-edit-save-button"
);
const peopleCancelButton = peopleEditButtonContainer.querySelector(
  "#people-cancel-edit-button"
);
const orgSaveButton = orgsEditButtonContainer.querySelector(
  "#orgs-edit-save-button"
);
const orgCancelButton = orgsEditButtonContainer.querySelector(
  "#orgs-cancel-edit-button"
);

let showingPeople = true; // boolean indicating whether people or organizations are being displayed.
let lastSelectedContact = null; // stores the id of the las selected person or organization. (same value as in the database)
let lastSelectedElement = null; // stores the element id containing the last selected person or organization.



/** 
* function that filters contacts or organizations based on the value of the search input field. 
*/
searchInput.addEventListener("keyup", function () {
  const value = this.value;

  if (showingPeople) {
    if (value === "") {
      getData("allC");
    } else {
      getData("matchC", value);
    }
  } else {
    if (value === "") {
      getData("allO");
    } else {
      getData("matchO", value);
    }
  }
});

/** 
* function that displays contacts in the address book. hides organizations.
*/
selectPeopleButton.onclick = function () {
  if (!showingPeople) {
    organizationDetailsDiv.style.display = "none";
    peopleDetailsDiv.style.display = "block";
    showingPeople = true;
    orgsList.style.display = "none";
    contactsList.style.display = "block";
  }

  getData("allC");

  lastSelectedContact = null;
  lastSelectedElement = null;

  firstNameTextArea.value = "";
  lastNameTextArea.value = "";
  emailTextArea.value = "";
  telephoneNumberTextArea.value = "";
  addressTextArea.value = "";
  organizationTextArea.value = "";

  return;
};

/** 
* function that displays organizations in the address book. hides contacts.
*/
selectOrgsButton.onclick = function () {
  if (showingPeople) {
    organizationDetailsDiv.style.display = "block";
    peopleDetailsDiv.style.display = "none";
    showingPeople = false;
    contactsList.style.display = "none";
    orgsList.style.display = "block";
  }

  getData("allO");
  lastSelectedContact = null;
  lastSelectedElement = null;

  organizationName.value = "";
  organizationEmail.value = "";
  organizationTelephoneNumber.value = "";
  organizationAddress.value = "";
  return;
};


/** 
* function that fetches data to populate the address book.

* @param {string} operation - specifies the query desired to be executed. eg : 'allC' stands for all contacts, 'allO' for all organizations.
* @param {string} string - specifies the string that desired contacts or organization need to match with.
* @return {JSON} the resulting query.
*/
function getData(operation, string = "") {
  $.post(
    "get-data.php",
    { operation: operation, string: string },

    function (data, status) {
      if (status === "success") {
        var results = JSON.parse(data);
        let newElement = null;
        let button = null;
        let name = null;
        let email = null;
        let index = 0;
        if (operation === "allC" || operation === "matchC") {
          contactsList.innerHTML = "";

          for (contact of results) {
            newElement = document.createElement("li");
            button = document.createElement("button");
            button.className = "contact";
            button.id = "contact" + index.toString();

            // function that displays details of contact in the address book when the contact is clicked.
            button.addEventListener("click", function () {
              disablePeopleTextAreas(true);

              lastSelectedElement = this.id;
              lastSelectedContact = results[this.id[7]].id;
              firstNameTextArea.value = results[this.id[7]].first_name;
              lastNameTextArea.value = results[this.id[7]].last_name;
              emailTextArea.value = results[this.id[7]].email;
              telephoneNumberTextArea.value =
                results[this.id[7]].telephone_number;
              addressTextArea.value = results[this.id[7]].address;
              organizationTextArea.value =
                results[this.id[7]].organization_name;
            });

            name = document.createElement("p");
            name.className = "contact-info";
            name.innerHTML = contact.first_name + " " + contact.last_name;

            email = document.createElement("p");
            email.className = "contact-info";
            email.innerHTML = contact.email;

            button.appendChild(name);
            button.appendChild(email);
            newElement.appendChild(button);
            contactsList.appendChild(newElement);

            index += 1;
          }
        } else {
          orgsList.innerHTML = "";

          for (organization of results) {
            newElement = document.createElement("li");

            button = document.createElement("button");
            button.className = "contact";
            button.id = "org" + index.toString();


            // function that displays details of organization in the address book when the organization is clicked.
            button.addEventListener("click", function () {
              disableOrgTextAreas(true);
              lastSelectedContact = results[this.id[3]].id;
              lastSelectedElement = this.id;
              organizationName.value = results[this.id[3]].name;
              organizationEmail.value = results[this.id[3]].email;
              organizationTelephoneNumber.value =
                results[this.id[3]].telephone_number;
              organizationAddress.value = results[this.id[3]].address;
            });

            name = document.createElement("p");
            name.className = "contact-info";
            name.innerHTML = organization.name;

            email = document.createElement("p");
            email.className = "contact-info";
            email.innerHTML = organization.email;

            button.appendChild(name);
            button.appendChild(email);
            newElement.appendChild(button);
            orgsList.appendChild(newElement);
            index += 1;
          }
        }

        return results;
      }

      return undefined;
    }
  );
}


/** 
* function that displays a form that allows to add users to the database. called when the add button is clicked
*/
addButton.addEventListener("click", function () {
  if (showingPeople) {
    bgUserModal.style.display = "flex";
  } else {
    bgOrgModal.style.display = "flex";
  }
});


/** 
* function that deletes the selected (stored in the lastSelectedElement global variable ) person or organization from the database.
*/
deleteButton.addEventListener("click", function () {
  if (lastSelectedContact == null) {
    return;
  }

  if (showingPeople) {
    $.post(
      "delete-person.php",
      { id: lastSelectedContact },

      function (data, status) {
        if (status === "success") {
          selectPeopleButton.click();
          lastSelectedContact = null;
          lastSelectedElement = null;
        }
      }
    );
  } else {
    $.post(
      "delete-org.php",
      { id: lastSelectedContact },

      function (data, status) {
        if (status === "success") {
          selectOrgsButton.click();
          lastSelectedContact = null;
          lastSelectedElement = null;
        }
      }
    );
  }
});



/** 
* function that enables editing of selected (stored in the lastSelectedElement global variable ) person or organization.
*/
editButton.addEventListener("click", function () {
  if (lastSelectedContact == null) {
    return;
  }

  if (showingPeople) {
    disablePeopleTextAreas(false);
  } else {
    disableOrgTextAreas(false);
  }
});

/** 
* function that saves changes made to a contact in the database(through a post request).
*/
peopleSaveButton.addEventListener("click", function () {
  $.post(
    "edit-user.php",
    {
      id: lastSelectedContact,
      firstName: firstNameTextArea.value,
      lastName: lastNameTextArea.value,
      email: emailTextArea.value,
      tel: telephoneNumberTextArea.value,
      org: organizationTextArea.value,
      address: addressTextArea.value,
    },

    function (data, status) {
      disablePeopleTextAreas(true);
      
      contactsList.querySelector("#" + lastSelectedElement).click();
      contactsList.querySelector("#" + lastSelectedElement).focus();
    }
  );
});

/** 
* function that disables editing of selected person.
*/
peopleCancelButton.addEventListener("click", function () {
  disablePeopleTextAreas(true);

  contactsList.querySelector("#" + lastSelectedElement).click();
  contactsList.querySelector("#" + lastSelectedElement).focus();
});

/** 
* function that saves changes made to a organization in the database(through a post request).
*/
orgSaveButton.addEventListener("click", function () {
  $.post(
    "edit-org.php",
    {
      id: lastSelectedContact,
      name: organizationName.value,
      email: organizationEmail.value,
      tel: organizationTelephoneNumber.value,

      address: organizationAddress.value,
    },

    function (data, status) {

      
      disableOrgTextAreas(true);
      orgsList.querySelector("#" + lastSelectedElement).click();
      orgsList.querySelector("#" + lastSelectedElement).focus();
    }
  );
});

/** 
* function that disables editing of selected organization.
*/
orgCancelButton.addEventListener("click", function () {
  disableOrgTextAreas(true);
  orgsList.querySelector("#" + lastSelectedElement).click();
  orgsList.querySelector("#" + lastSelectedElement).focus();
});

/** 
* function that enables or disables text areas holding information on contacts to enable editing. hides or shows save/cancel buttons.
@param {boolean} disable - specifies whether to disable or enable text areas and edit buttons.

*/
function disablePeopleTextAreas(disable) {
  firstNameTextArea.disabled = disable;
  lastNameTextArea.disabled = disable;
  emailTextArea.disabled = disable;
  telephoneNumberTextArea.disabled = disable;

  addressTextArea.disabled = disable;
  organizationTextArea.disabled = disable;

  if (disable) {
    peopleEditButtonContainer.style.display = "none";
  } else {
    peopleEditButtonContainer.style.display = "flex";
  }
}

/** 
* function that enables or disables text areas holding information on organizations to enable editing. hides or shows save/cancel buttons.
@param {boolean} disable - specifies whether to disable or enable text areas and edit buttons.

*/
function disableOrgTextAreas(disable) {
  organizationName.disabled = disable;
  organizationEmail.disabled = disable;
  organizationTelephoneNumber.disabled = disable;
  organizationAddress.disabled = disable;

  if (disable) {
    orgsEditButtonContainer.style.display = "none";
  } else {
    orgsEditButtonContainer.style.display = "flex";
  }
}


getData("allC"); // loads contacts into the contacts list