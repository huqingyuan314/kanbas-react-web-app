import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const {uid} = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const { pathname } = useLocation(); // Get the current path

  

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const saveEmail = async () => {
    const updatedEmail = { ...user, email };
    await client.updateUser(updatedEmail);
    setUser(updatedEmail);
    setEditingEmail(false);
    navigate(-1);
  };

  const [role, setRole] = useState("");
  const [editingRole, setEditingRole] = useState(false);
  const saveRole = async () => {
    const updatedRole = { ...user, role };
    await client.updateUser(updatedRole);
    setUser(updatedRole);
    setEditingRole(false);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;



  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />

      <div className="text-danger fs-4 wd-name"> 
      {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
        {user.firstName} {user.lastName} </div>)}
                {user && editing && (
                    <input className="form-control w-50 wd-edit-name"
                      defaultValue={`${user.firstName} ${user.lastName}`}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { saveUser(); }}}/>)}
        </div>

    <div>
      {!editingEmail && (
          <FaPencil onClick={() => setEditingEmail(true)}
              className="float-end fs-6 mt-2 wd-edit" /> )}
        {editingEmail && (
          <FaCheck onClick={() => saveEmail()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
 
        {!editingEmail && (
          <div className="wd-email"
               onClick={() => setEditingEmail(true)}>
        <b>Email:</b> {user.email} </div>)}       
       {/* <span className="wd-email">         {user.email}         </span> <br /> */}

       {user && editingEmail && (
                    <input className="form-control w-50 wd-edit-email"
                      defaultValue={`${user.email}`}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { saveEmail(); }}}/>)}
    </div>

    <div>
  {!editingRole && (
    <FaPencil onClick={() => setEditingRole(true)} className="float-end fs-6 mt-2 wd-edit" />
  )}
  {editingRole && (
    <FaCheck onClick={() => saveRole()} className="float-end fs-5 mt-2 me-2 wd-save" />
  )}
  {!editingRole && (
    <div className="wd-role" onClick={() => setEditingRole(true)}>
      <b>Role:</b> {user.role}
    </div>
  )}
  {editingRole && (
    <select
      className="form-select w-50 wd-edit-role"
      defaultValue={user.role}
      onChange={(e) => setRole(e.target.value)} 
      onKeyDown={(e) => {if (e.key === "Enter") { saveRole(); }}} >
      <option value="STUDENT">Student</option>
      <option value="TA">Assistant</option>
      <option value="FACULTY">Faculty</option>
      <option value="ADMIN">Administrator</option>
    </select>
  )}
</div>
      
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
      
      <hr />

      { pathname.includes("Account") && (
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      )}
      
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>

      </div> ); }

