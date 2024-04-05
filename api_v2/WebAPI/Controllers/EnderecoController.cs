using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {

        private IEnderecoRepository enderecoRepository;

        public EnderecoController() {
            enderecoRepository = new EnderecoRepository(); 
        }

        [HttpPost("Cadastrar")]
        public IActionResult Post(EnderecoViewModel endereco)
        {
            enderecoRepository.Cadastrar(endereco);
            return StatusCode(201);
        }

        [HttpGet("ListarTodas")]
        public IActionResult Get()
        {
            return Ok(enderecoRepository.Listar());
        }
    }
}
