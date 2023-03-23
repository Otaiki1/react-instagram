import { useLiveQuery } from "dexie-react-hooks";
import getPhotoUrl from "get-photo-url";
import { useState } from "react";
import profileIcon from "../assets/profileIcon.svg";
import { db } from "../dexie";

const Bio = () => {
  const userInfo = useLiveQuery(() => db.bio.get("info"), []);
  const userDp = useLiveQuery(() => db.bio.get("profilePhoto"), []);

  // console.log(userInfo, userDp)

  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const updateUserDetails = async (event) => {
    event.preventDefault();
    const objectData = {
      name: event.target.nameOfUser.value,
      about: event.target.aboutUser.value,
    };

    await db.bio.put(objectData, "info");
    setEditFormIsOpen(false);
  };

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  const editForm = (
    <form className="edit-bio-form" onSubmit={(e) => updateUserDetails(e)}>
      <input
        type="text"
        id=""
        name="nameOfUser"
        defaultValue={userInfo?.name}
        placeholder="Your name"
        required
      />
      <input
        type="text"
        id=""
        name="aboutUser"
        defaultValue={userInfo?.about}
        placeholder="About you"
        required
      />
      <br />
      <button
        type="button"
        className="cancel-button"
        onClick={() => setEditFormIsOpen(false)}
      >
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  );

  const editButton = (
    <button onClick={() => setEditFormIsOpen(true)}>Edit</button>
  );

  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div
          className="profile-photo"
          role="button"
          title="Click to edit photo"
        >
          <img src={userDp ? userDp : profileIcon} alt="profile" />
        </div>
      </label>

      <div className="profile-info">
        <p className="name">{userInfo ? userInfo.name : "Input Username"}</p>
        <p className="about">{userInfo ? userInfo.about : "Input About"}</p>

        {editFormIsOpen ? editForm : editButton}
      </div>
    </section>
  );
};

export default Bio;
