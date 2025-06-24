const { conexao } = require('../conexao.js')

async function editarIntegralmenteCategoria(infos, id) {
    const sql = `UPDATE tbl_categoria SET nome = ? WHERE id = ${id}`
    const conn = await conexao()
    
    try {
        const [results] = await conn.query(sql, [infos])
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarIntegralmenteCategoria }
