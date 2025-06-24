const { conexao } = require('../conexao.js')

async function editarIntegralmenteEndereco(infos, id) {
    const sql = `UPDATE tbl_endereco SET logradouro = ?, cep = ?, numero = ?, bairro = ?, cidade = ? WHERE id = ${id};`
    const conn = await conexao()
    
    try {
        const [results] = await conn.query(sql, [...infos])
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarIntegralmenteEndereco }
