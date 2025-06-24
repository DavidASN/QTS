const { conexao } = require('../conexao.js')

async function editarIntegralmentePedido(infos, numero) {
    const sql = `UPDATE tbl_pedido SET data_elaboracao = ?, cliente_id = ? WHERE numero = ${numero};`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [...infos])
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarIntegralmentePedido }
