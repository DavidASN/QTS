const { conexao } = require('../conexao.js')

async function editarParcialmentePedido(numero, campo, valor) {
    const data = [valor, numero]

    const colunasPermitidas = ['data_elaboracao', 'cliente_id']
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida');
    }

    const sql = `UPDATE tbl_pedido SET ${campo} = ? WHERE numero = ?;`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, data)
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarParcialmentePedido }
