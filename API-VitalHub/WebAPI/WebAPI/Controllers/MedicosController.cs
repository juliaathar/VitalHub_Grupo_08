using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository;
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicoRepository.ListarTodos());
        }


        [Authorize]
        [HttpPut]
        public IActionResult AtualizarPerfil(MedicoViewModel medico)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(_medicoRepository.AtualizarPerfil(idUsuario, medico));
        }

        [HttpPost]
        public IActionResult CadastrarMedico(MedicoViewModel medicoModel)
        {
            Usuario usuario = new Usuario();

            usuario.Nome = medicoModel.Nome;
            usuario.Email = medicoModel.Email;
            usuario.TipoUsuarioId = medicoModel.IdTipoUsuario;
            usuario.Foto = medicoModel.Foto;
            usuario.Senha = medicoModel.Senha;

            usuario.Medico = new Medico();

            usuario.Medico.EspecialidadeId = medicoModel.EspecialidadeId;
            usuario.Medico.Crm = medicoModel.Crm;

            _medicoRepository.CadastrarMedico(usuario);

            return Ok();

        }


    }
}
