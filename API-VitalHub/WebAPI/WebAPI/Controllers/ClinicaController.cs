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
    public class ClinicaController : ControllerBase
    {
        private IClinicaRepository _clinicaRepository;

        public ClinicaController() {
        
            _clinicaRepository = new ClinicaRepository();
        }

        [HttpGet("porEspecialidade")]
        public IActionResult ListarPorEspecialidade([FromQuery] Guid especialidadeId)
        {
            var clinicas = _clinicaRepository.ListarPorEspecialidade(especialidadeId);

            if (clinicas == null || clinicas.Count == 0)
            {
                return NotFound("Nenhuma clínica encontrada com a especialidade fornecida.");
            }

            return Ok(clinicas);
        }

        [HttpPost]
        public IActionResult Cadastrar(ClinicaViewModel clinicaModel)
        {
            Clinica clinica = new Clinica();

        }
    }
}
