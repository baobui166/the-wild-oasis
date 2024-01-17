import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins could not be delete");
  }
  return data;
}

export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //createOrEditCabin
  let query = supabase.from("cabins");
  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // update image
  const { error: storageUload } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //if image have error, delete cabin was create
  if (storageUload) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageUload);
    throw new Error(
      "Cabins image was error when upload and the cabin was not created"
    );
  }

  //return cabin
  return data;
}
