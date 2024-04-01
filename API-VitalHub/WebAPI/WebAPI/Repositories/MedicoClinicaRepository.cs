using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class MedicoClinicaRepository : IMedicoClinicaRepository
    {

        VitalContext _ctx = new VitalContext();
        public void Cadastrar(MedicosClinica medicosClinica)
        {
            _ctx.MedicosClinicas.Add(medicosClinica);
            _ctx.SaveChanges();
        }
    }
}
