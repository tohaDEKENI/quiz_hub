import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        if (session.data?.user) {
          setUser({
            id: session.data.user.id,
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image as string,
          });
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

  if (loading) {
    return <div className="text-sm text-gray-500">Chargement...</div>;
  }

  if (!user) {
    return (
      <div>
        <Link href={"/sign/sign-in"}>
          <button className="px-2 py-2 md:py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center gap-2 font-medium text-sm transition cursor-pointer">
            <User className="w-5 h-5" />
            Se connecter
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div className="dropdown dropdown-end">
        {/* Bouton avatar */}
        <div
          tabIndex={0}
          role="button"
          className="flex items-center cursor-pointer rounded-full hover:bg-gray-100 p-1 transition"
        >
          <img
            src={user.image}
            alt="Avatar"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
          />
        </div>

        {/* Menu déroulant façon YouTube */}
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] shadow-lg bg-base-300 rounded-xl w-72 overflow-hidden"
        >
          {/* Profil */}
          <li className="p-4 flex items-center gap-3 border-b">
            <img
              src={user.image}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              <Link
                href="/profile"
                className="text-blue-600 text-xs font-medium hover:underline"
              >
                Gérer votre compte
              </Link>
            </div>
          </li>

          {/* Liens */}
          <li>
            <Link
              href="/profile"
              className="px-4 py-2 text-sm hover:bg-gray-100 flex"
            >
              Mon profil
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="px-4 py-2 text-sm hover:bg-gray-100 flex"
            >
              Paramètres
            </Link>
          </li>
          <li>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex">
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
