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
    public class MedicoClinicaController : ControllerBase
    {
        private IMedicoClinicaRepository _medicoClinicaRepository;

        public MedicoClinicaController()
        {
            _medicoClinicaRepository = new MedicoClinicaRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(MedicoClinicaViewModel mcModel)
        {
            MedicosClinica mc = new MedicosClinica();

            mc.MedicoId = mcModel.MedicoId;
            mc.ClinicaId = mcModel.ClinicaId;

            _medicoClinicaRepository.Cadastrar(mc);

            return StatusCode(201, mc);
        }
    }
}
