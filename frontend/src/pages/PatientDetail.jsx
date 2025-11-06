import React, { useEffect, useState, useRef } from 'react'
import useSingleUser from '../hooks/useSingleUser'
import { Link } from 'react-router-dom'
import { ArrowLeft, SquarePen, User, FileText, Phone, MapPin, Activity, Heart, Printer, Download } from 'lucide-react'
import useSingleRekamMedis from '../hooks/useSingleRekamMedis'
import useRekamMedis from '../hooks/useRekamMedis'
import { toPng } from 'html-to-image'

function PatientDetail() {
  const { singleUser } = useSingleUser()
  const { rekamMedis } = useRekamMedis()
  const { singleRekamMedis } = useSingleRekamMedis()
  const [activeTab, setActiveTab] = useState('overview')

  const resepObatRef = useRef()

  const handleCapture = async ()=>{
    if(!resepObatRef.current) return

    const dataUrl = await toPng(resepObatRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    })

    const link = document.createElement('a');
    link.download = 'resep-obat.png';
    link.href = dataUrl;
    link.click();
  }

  const handlePrint = async () => {
  if (!resepObatRef.current) return;

  try {
    const dataUrl = await toPng(resepObatRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const win = window.open('');
    win.document.write(`
      <html>
        <head>
          <title>Resep Obat | Rumah Sakit Pasien</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              text-align: center;
              font-family: sans-serif;
              display: flex;
              flex-direction: column;
              height: 100vh;
            }
            img {
              max-width: 90%;
              height: auto;
              margin-top: 20px;
            }
            .signature {
              text-align: left;
              margin: 60px 0 0 60px;
              font-size: 16px;
              font-weight: bold;
              color: #000;
            }
            .signature-line {
              display: block;
              width: 200px;
              border-top: 1px solid #000;
              margin-bottom: 5px;
            }
            .recipe-data{
              flex:1;
            }
          </style>
        </head>
        <body>
          <div class="recipe-data">
            <img src="${dataUrl}" alt="Resep" />
          </div>
          <div class="signature">
            <span class="signature-line"></span>
            Dr. Kurnia
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);
    win.document.close();
  } catch (error) {
    console.error('Failed to capture or print:', error);
  }
};


  useEffect(()=>{
    console.log(singleUser)
  }, [])

  return (
    <div className='p-6 lg:ms-70'>
      <div className='flex flex-col gap-3'>
        <Link to={'/patient'} className='flex items-center gap-3 p-2 bg-white font-semibold border border-gray-400 w-fit rounded-md hover:text-white hover:bg-emerald-700 transition-all duration-100'>
          <ArrowLeft/>
          Kembali
        </Link>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-bold text-2xl'>Detail Pasien</h1>
            <p className='text-gray-500'>Informasi lengkap pasien dan riwayat medis</p>
          </div>
          <div className='flex items-center gap-4'>
            <Link to={`/edit-patient/${singleUser.kode_pasien}`} className='flex items-center gap-3 p-2 text-sm bg-white font-semibold border rounded-md border-gray-400 w-fit hover:text-white hover:bg-emerald-700 transition-all duration-100'>
              <SquarePen size={20} />
              Edit Data
            </Link>
            <Link to={`/add-medical-record/${singleUser.kode_pasien}`} className='flex items-center gap-3 p-2 text-sm bg-white font-semibold border rounded-md border-gray-400 w-fit hover:text-white hover:bg-emerald-700 transition-all duration-100'>
              <FileText size={20} />
              Tambah Rekam Medis
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex flex-col gap-4 bg-blue-100 border border-blue-300 rounded-md p-6'>
          <div className='flex gap-6 items-center'>
            <div className='h-24 min-w-24 bg-blue-300 text-blue-500 rounded-full flex items-center justify-center'>
              <User size={50} />
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold text-3xl'>{singleUser.nama}</h1>
              <p>{singleUser.kode_pasien}</p>
              <p className='px-3 py-1 bg-blue-400 text-white rounded-full w-fit'>{singleRekamMedis?.diagnosa || 'Belum ada diagnosa'}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-y-4'>
            <div className='flex flex-col items-center'>
              <h3 className='text-gray-600'>NIK</h3>
              <p className='font-semibold'>{singleUser.nik}</p>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-gray-600'>Tanggal Lahir</h3>
              <p className='font-semibold'>{`${new Date(singleUser.tanggal_lahir).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}`}
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-gray-600'>Tempat Lahir</h3>
              <p className='font-semibold'>{singleUser.tempat_lahir}</p>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-gray-600'>Alamat</h3>
              <p className='font-semibold'>{singleUser.alamat}</p>
            </div>
          </div>
        </div>
        <div className='p-1 bg-gray-200 grid grid-flow-col text-nowrap overflow-x-auto justify-items-center mt-2 rounded-md gap-x-2 mt-6'>
          <button onClick={() => setActiveTab('overview')} className={`${activeTab === 'overview' ? 'bg-white' : 'text-gray-500'} w-full py-1 px-3 rounded-md font-semibold`}>Overview</button>
          <button onClick={() => setActiveTab('rekam-medis')} className={`${activeTab === 'rekam-medis' ? 'bg-white' : 'text-gray-500'} w-full py-1 px-3 rounded-md font-semibold`}>Rekam Medis</button>
          <button onClick={() => setActiveTab('tanda-vital')} className={`${activeTab === 'tanda-vital' ? 'bg-white' : 'text-gray-500'} w-full py-1 px-3 rounded-md font-semibold`}>Tanda Vital</button>
        </div>
        <div className='mt-6'>
          {activeTab === 'overview' && (
            <div className='grid grid-cols-1 gap-y-3'>
              <div className='p-6 border border-gray-300 rounded-md'>
                <div className='pb-6 border-b border-gray-300'>
                  <div className='flex items-center gap-3'>
                    <Phone className='text-blue-500' />
                    <h1 className='text-xl font-semibold'>Informasi Kontak</h1>
                  </div>
                  <div className='flex items-center gap-3 mt-5'>
                    <User size={20} className='text-gray-500' />
                    NIK: {singleUser.nik}
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                    <MapPin size={20} className='text-gray-500' />
                    Alamat: {singleUser.alamat}
                  </div>
                </div>
                <div className='pt-6'>
                  <div>
                    <p className='font-semibold'>Tempat, Tanggal Lahir</p>
                    <p className='text-gray-500'>{`${singleUser.tempat_lahir}, ${new Date(singleUser.tanggal_lahir).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className='p-6 border border-gray-300 rounded-md flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                  <Activity className='text-green-500' />
                  <h1 className='text-xl font-semibold'>Informasi Medis</h1>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col'>
                    <h2 className='font-semibold'>Riwayat Penyakit</h2>
                    <p>{singleRekamMedis?.riwayat_penyakit || 'belum ada'}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-semibold'>Diagnosa</h2>
                    <p>{singleRekamMedis?.diagnosa}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-semibold'>Terapi dan Anjuran</h2>
                    <p>{singleRekamMedis?.terapi_dan_anjuran || 'belum ada'}</p>
                  </div>
                </div>
              </div>
              <div className='p-6 border border-gray-300 rounded-md flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                  <FileText className='text-blue-500'/>
                  <h2 className='text-xl font-semibold'>Rekam Medis Terbaru</h2>
                </div>
                <div>
                  <div className='px-5 py-3 border border-gray-300 rounded-md flex flex-col gap-3'>
                    <h2 className='text-xl font-semibold'>{singleRekamMedis?.riwayat_penyakit || 'belum ada'}</h2>
                    <div className='text-gray-500'>
                      <p>Tekanan Darah: {singleRekamMedis?.tekanan_darah || 'belum ada'}</p>
                      <p>Denyut Nadi: {singleRekamMedis?.denyut_nadi || 'belum ada'}</p>
                      <p>Suhu Badan: {singleRekamMedis?.suhu || 'belum ada'}</p>
                      <p>Berat Badan: {singleRekamMedis?.berat_badan || 'belum ada'}</p>
                    </div>
                    <p ref={resepObatRef} className='text-black'><span className='font-semibold'>Resep:</span> {singleRekamMedis?.resep_obat || 'belum ada'}</p>
                    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2'>
                      <button onClick={handleCapture} className='bg-emerald-500 text-white p-2 rounded-md flex items-center justify-center gap-2'>
                        <Download></Download>
                        <p>Download Resep Obat</p>
                      </button>
                      <button onClick={handlePrint} className='bg-blue-500 text-white p-2 rounded-md flex items-center justify-center gap-2'>
                        <Printer></Printer>
                        <p>Print Resep Obat</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'rekam-medis' && (
            <div className="flex flex-col gap-4">
              {rekamMedis.length > 0 ? (
                rekamMedis.map((rm) => (
                  <div key={rm?.rekam_id} className="p-4 border border-gray-300 rounded-md bg-white">
                    <div className='mb-3'>
                      <div>
                        <h3 className="font-semibold text-lg">{rm?.diagnosa || 'belum ada'}</h3>
                        <p className='text-gray-500'>{new Date(rm?.dibuat_pada || 'belum ada').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 mb-3 pb-3 border-b border-gray-300'>
                      <h3 className="font-semibold text-lg">Catatan Medis</h3>
                      <div>
                        <p className="text-gray-500">Tekanan Darah: {rm?.tekanan_darah || 'belum ada'}</p>
                        <p className="text-gray-500">Denyut Nadi: {rm?.denyut_nadi || 'belum ada'}</p>
                        <p className="text-gray-500">Suhu: {rm?.suhu}</p>
                        <p className="text-gray-500">Berat Badan: {rm?.berat_badan || 'belum ada'}</p>
                      </div>
                    </div>
                    <p className="text-gray-500"><span className='font-semibold'>Resep:</span> {rm?.resep_obat || 'belum ada'}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Belum ada rekam medis</p>
              )}
            </div>
          )}
          {activeTab === 'tanda-vital' && (
            <div className='p-6 border border-gray-300 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Heart className='text-red-500' />
                <h2 className='font-semibold text-lg'>Tanda Vital</h2>
              </div>
              <div className='p-6 grid grid-cols-3 justify-items-center'>
                <div className='justify-items-center'>
                  <h3 className='text-gray-500'>Tekanan Darah</h3>
                  <p className='font-semibold'>{singleRekamMedis?.tekanan_darah || 'belum ada'}</p>
                </div>
                <div className='justify-items-center'>
                  <h3 className='text-gray-500'>Denyut Nadi</h3>
                  <p className='font-semibold'>{singleRekamMedis?.denyut_nadi || 'belum ada'}</p>
                </div>
                <div className='justify-items-center'>
                  <h3 className='text-gray-500'>Suhu Tubuh</h3>
                  <p className='font-semibold'>{singleRekamMedis?.suhu || 'belum ada'}°C</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDetail