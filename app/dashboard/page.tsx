'use client';
import { useState } from "react";
import Linkify from "linkify-react";
import Navbar from "@/components/home/HomeNavbar";

export default function Home() {
  const message = "Voici un lien vers https://openai.com  et une autre info.";

  const options = {
    target: "_blank",
    className: "text-blue-600 underline hover:text-blue-800",
    rel: "noopener noreferrer",
  };

  return (
    <div className="text-sm text-gray-700">
      
      <Linkify options={options}>{message}</Linkify>

      <br />

      <button
        className="btn mt-4"
        onClick={() => {
          const selection = window.getSelection()?.toString().trim();
          if (selection) {
            alert("Texte sélectionné : " + selection);
          } else {
            alert("Aucune sélection.");
          }
        }}
      >
        Voir
      </button>
    </div>
  );
}
