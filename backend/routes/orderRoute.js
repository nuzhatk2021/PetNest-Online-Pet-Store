import { Router } from 'express';
import supabase from '../database/petDatabase.js';

const router = Router();

function isSoldFlag(v) {
  return v === true || v === "true" || v === "t" || v === 1 || v === "1";
}

router.post("/place", async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];

    if (items.length === 0) {
      return res.status(400).json({ message: "No items in order." });
    }

    const seen = new Set();
    for (const it of items) {
      const id = it?.id;
      if (id === undefined || id === null) {
        return res.status(400).json({ message: "Each line item must include a pet id." });
      }
      if (seen.has(id)) {
        return res.status(400).json({ message: "Duplicate pet in order. Each pet can only be purchased once." });
      }
      seen.add(id);

      const qty = Number(it.qty);
      if (!Number.isFinite(qty) || qty !== 1) {
        return res.status(400).json({ message: "Each pet can only be purchased in quantity of 1." });
      }
    }

    const petIds = [...seen];

    const { data: rows, error: fetchError } = await supabase
      .from("Pet")
      .select("PetID, IsSold")
      .in("PetID", petIds);

    if (fetchError) {
      return res.status(500).json({ message: fetchError.message });
    }

    if (!rows || rows.length !== petIds.length) {
      return res.status(400).json({ message: "One or more pets were not found." });
    }

    if (rows.some((r) => isSoldFlag(r.IsSold))) {
      return res.status(409).json({ message: "One or more pets are already sold." });
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
