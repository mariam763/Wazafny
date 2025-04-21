import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector, useDispatch  } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/apiEndpoints'
import { setUser } from '@/redux/authSlice'


const UpdateProfile = ({open,setOpen}) => {
     const [loading, setLoading] = useState(false);
     const { user } = useSelector((store) => store.auth);

     const [input, setInput] = useState({
       fullname: user?.fullname || "",
       email: user?.email || "",
       phoneNumber: user?.phoneNumber || "",
       bio: user?.profile?.bio || "",
       skills: user?.profile?.skills?.map((skill) => skill) || "",
       file: user?.profile?.resume || "",
     });
     const dispatch = useDispatch();

     const changeEventHandler = (e) => {
       setInput({ ...input, [e.target.name]: e.target.value });
     };

     const fileChangeHandler = (e) => {
       const file = e.target.files?.[0];
       setInput({ ...input, file });
     };

     const submitHandler = async (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append("fullname", input.fullname);
       formData.append("email", input.email);
       formData.append("phoneNumber", input.phoneNumber);
       formData.append("bio", input.bio);
       formData.append("skills", input.skills);
       if (input.file) {
         formData.append("file", input.file);
       }
       try {
         setLoading(true);
         const res = await axios.post(
           `${USER_API_END_POINT}/profile/update`,
           formData,
           {
             headers: {
               "Content-Type": "multipart/form-data",
             },
             withCredentials: true,
           }
         );
         if (res.data.success) {
           dispatch(setUser(res.data.user));
           toast.success(res.data.message);
         }
       } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
       }
        finally {
         setLoading(false);
       }
       setOpen(false);
       console.log(input);
     };

    return (
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[500px] bg-gradient-to-br from-[#1a002d] to-[#2c014f] text-white border border-purple-800 shadow-2xl rounded-2xl backdrop-blur-lg p-6"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-white text-2xl font-extrabold tracking-wide">
              Update Your Profile
            </DialogTitle>
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)} // This will close the dialog
              className="absolute top-3 right-3 text-white text-2xl cursor-pointer hover:text-purple-500"
            >
              &times;
            </button>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-6 py-4">
              {[
                { id: "fullname", label: "Full Name", type: "text" },
                { id: "email", label: "Email Address", type: "email" },
                { id: "phoneNumber", label: "Phone Number", type: "text" },
                { id: "bio", label: "Short Bio", type: "text" },
                {
                  id: "skills",
                  label: "Skills (comma separated)",
                  type: "text",
                },
              ].map(({ id, label, type }) => (
                <div key={id} className="relative">
                  <label
                    htmlFor={id}
                    className="absolute left-3 top-[-10px] bg-[#1a002d] px-1 text-xs font-semibold text-purple-300"
                  >
                    {label}
                  </label>
                  <Input
                    id={id}
                    name={id}
                    type={type}
                    value={input[id]}
                    onChange={changeEventHandler}
                    className="w-full px-4 py-2 rounded-xl bg-[#29044d] border border-purple-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              ))}

              {/* File Upload Field */}
              <div className="relative">
                <label
                  htmlFor="file"
                  className="absolute left-3 top-[-10px] bg-[#1a002d] px-1 text-xs font-semibold text-purple-300"
                >
                  Upload Resume (PDF)
                </label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="w-full file:px-4 file:py-2 file:rounded-xl file:bg-purple-700 file:text-white file:cursor-pointer file:transition-all file:hover:bg-purple-800 text-white border border-purple-700 rounded-xl bg-[#29044d] cursor-pointer"
                />
              </div>
            </div>

            <DialogFooter>
              {loading ? (
                <Button className="w-full mt-6 bg-purple-600 text-white font-semibold py-2 rounded-xl shadow-md flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold py-2 rounded-xl hover:shadow-lg hover:shadow-purple-700 transition-all"
                >
                  Update Profile
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}

export default UpdateProfile

