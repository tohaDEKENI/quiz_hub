import { connexion } from "@/lib/connexion";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Récupérer le nombre actuel de vues
    const [data] = await connexion.execute<RowDataPacket[]>(
      "SELECT vues FROM quiz WHERE id = ?",
      [id]
    );

    if (!data[0]) {
      return NextResponse.json({ message: "Quiz introuvable" }, { status: 404 });
    }

    // Incrémenter
    const newVues = (data[0].vues as number) + 1;

    // Mettre à jour
    await connexion.execute("UPDATE quiz SET vues = ? WHERE id = ?", [newVues, id]);

    return NextResponse.json({ message: "Vue incrémentée", vues: newVues });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de l'incrémentation" }, { status: 500 });
  }
}
