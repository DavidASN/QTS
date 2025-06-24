const { conexao } = require('../conexao.js')

async function editarParcialmenteStatus(id, campo, valor) {
    const data = [valor, id]

    const colunasPermitidas = ['nome']
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida')
    }

    const sql = `UPDATE tbl_status SET ${campo} = ? WHERE id = ?;`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, data)
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarParcialmenteStatus }
