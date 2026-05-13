import { Router } from 'express';
import supabase from '../database/petDatabase.js';

const router = Router();

router.post("/place", async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
<<<<<<< HEAD
    const petIds = [...new Set(items.map((it) => it?.id).filter((id) => id !== undefined && id !== null))];

    if (petIds.length === 0) {
      return res.status(400).json({ message: "No pet ids provided." });
=======
    if (items.length === 0) {
      return res.status(400).json({ message: "No items in order." });
    }

    const petIds = [];
    const seen = new Set();
    for (const it of items) {
      const id = it?.id;
      if (id === undefined || id === null) {
        return res.status(400).json({ message: "Each order line must include a pet id." });
      }
      const qty = Number(it?.qty ?? 1);
      if (!Number.isFinite(qty) || qty !== 1) {
        return res.status(400).json({ message: "Each pet can only be purchased once (quantity must be 1)." });
      }
      if (seen.has(id)) {
        return res.status(400).json({ message: "The same pet cannot appear twice in one order." });
      }
      seen.add(id);
      petIds.push(id);
>>>>>>> 3a88ab5 (update)
    }

    const { data, error } = await supabase
      .from("Pet")
      .update({ IsSold: true })
      .in("PetID", petIds)
      .select("PetID, IsSold");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      message: "Order placed.",
      updated: data ?? [],
    });
  } catch (err) {
    return res.status(500).json({ message: err?.message ?? "Unexpected error" });
  }
});

export default router;
