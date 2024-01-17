import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getUserCurrent() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  console.log("log out account");

  if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatart: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //1. Update fullName or password
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: errorInfor } = await supabase.auth.updateUser(
    updateData
  );

  if (errorInfor) throw new Error(errorInfor.message);
  if (!avatar) return data;

  //2. Create url img avatart and upload
  console.log(data);
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: errorUploadAvatar } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (errorUploadAvatar) throw new Error(errorUploadAvatar.message);
  //3. Update img avatart on interface

  const { data: updateUser, error: errorUploadAvatar2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (errorUploadAvatar2) throw new Error(errorUploadAvatar2.message);

  return updateUser;
}
