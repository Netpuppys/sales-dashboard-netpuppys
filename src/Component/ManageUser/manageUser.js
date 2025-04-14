import axios from "axios";
import { useEffect, useState } from "react";
import BASEURL from "../../BaseURL";
import CreateUser from "../../ui/CreateUser";
function ManageUser({ users }) {
  const [createUser, setCreateUser] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASEURL}/api/auth/delete-user/${id}`);
      alert(res.data.message); // Show success message
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error); // Show error message
    }
  };

  useEffect(() => {
    if (createUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createUser]);

  return (
    <div className="w-full py-10 px-6 h-full">
      <div className="w-full h-full flex justify-between items-center">
        <h3 className="text-3xl font-bold text-center mb-5">
          {users.length} Users
        </h3>
        <div className="flex justify-center items-center gap-4">
          <button
            type="submit"
            onClick={() => setCreateUser(true)}
            className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
          >
            Create User
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto w-full mt-3">
          <table className="table-auto relative border-collapse w-full text-left bg-white shadow-md rounded-md">
            <thead className="bg-[#ececec] border-b border-[#696969] text-sm">
              <tr>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Name
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Email
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Role
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Delete User
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-[#ececec] text-sm">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {createUser && (
          <CreateUser createUser={createUser} setCreateUser={setCreateUser} />
        )}
    </div>
  );
}

export default ManageUser;
