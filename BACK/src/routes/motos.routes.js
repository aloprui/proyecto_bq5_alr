const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

/*GET /api/motos*/
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(`SELECT
        ID AS "id",
        NOMBRE AS "nombre",
        CATEGORIA AS "categoria",
        DESCRIPCION AS "descripcion",
        PRECIO AS "precio",
        STOCK AS "stock",
        IMAGEN AS "imagen"
      FROM MOTOS
      ORDER BY CATEGORIA, NOMBRE`);

    res.json(result.rows);

  } catch (e) {
    res.status(500).json({
      error: "Error listando motos",
      details: e.message
    });
  } finally {
    if (conn) await conn.close();
  }
});

/*GET /api/motos/categorias*/
router.get("/categorias", async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(`SELECT DISTINCT
        CATEGORIA AS "categoria"
      FROM MOTOS
      ORDER BY CATEGORIA`);

    res.json(result.rows.map(r => r.categoria));

  } catch (e) {
    res.status(500).json({
      error: "Error listando categorías",
      details: e.message
    });
  } finally {
    if (conn) await conn.close();
  }
});

/*GET /api/motos/categoria/:categoria*/
router.get("/categoria/:categoria", async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const categoria = req.params.categoria;

    const result = await conn.execute(`SELECT
        ID AS "id",
        NOMBRE AS "nombre",
        CATEGORIA AS "categoria",
        DESCRIPCION AS "descripcion",
        PRECIO AS "precio",
        STOCK AS "stock",
        IMAGEN AS "imagen"
      FROM MOTOS
      WHERE CATEGORIA = :categoria
      ORDER BY NOMBRE`,
      { categoria });

    res.json(result.rows);

  } catch (e) {
    res.status(500).json({
      error: "Error filtrando por categoría",
      details: e.message
    });
  } finally {
    if (conn) await conn.close();
  }
});

module.exports = router;