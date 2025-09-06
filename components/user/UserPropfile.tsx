"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export default function UserProfileButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        if (session.data?.user) {
          setUser({
            id: session.data?.user.id,
            name: session.data?.user.name,
            email: session.data?.user.email,
            image: session.data?.user.image as string,
          });
          console.log(session)
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary m-1">
        {loading ? <Loader2 className="animate-spin" size={16} /> : user?.name || "Mon compte"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-72"
      >
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : !user ? (
          <p className="text-center text-gray-500">Aucun utilisateur connecté</p>
        ) : (
          <div className="flex flex-col items-center">
            {user.image ? (
              <img
                src={user.image}
                alt="Avatar"
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <h2 className="text-lg font-semibold mb-1">{user.name || "Nom non défini"}</h2>
            <p className="text-gray-600">{user.email || "Email non défini"}</p>
          </div>
        )}
      </ul>
    </div>
  );
}
