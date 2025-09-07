import { supabase } from "../lib/SupabaseClient";

export const signUpUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    console.log("Unexpected Error:", error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    console.log("Unexpected Error:", error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};
