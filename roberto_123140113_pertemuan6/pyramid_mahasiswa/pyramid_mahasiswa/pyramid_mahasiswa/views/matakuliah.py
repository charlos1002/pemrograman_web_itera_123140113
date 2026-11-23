from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Matakuliah


def validate_positive_int(value, field_name):
    """Memastikan nilai bertipe integer positif (> 0) dan bukan boolean"""
    if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
        raise ValueError(f'Field {field_name} harus berupa bilangan bulat positif (> 0)!')
    return value


# 1. READ ALL: Menampilkan daftar seluruh matakuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data matakuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


# 2. READ ONE: Menampilkan detail satu matakuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu matakuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID matakuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data matakuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan matakuliah baru dari payload JSON"""
    try:
        json_data = request.json_body

        # Validasi kelengkapan field wajib
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data or json_data[field] is None or str(json_data[field]).strip() == '':
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        # Validasi sks dan semester harus integer positif
        try:
            sks = validate_positive_int(json_data['sks'], 'sks')
            semester = validate_positive_int(json_data['semester'], 'semester')
        except ValueError as ve:
            return HTTPBadRequest(json_body={'error': str(ve)})

        matakuliah = Matakuliah(
            kode_mk=str(json_data['kode_mk']).strip(),
            nama_mk=str(json_data['nama_mk']).strip(),
            sks=sks,
            semester=semester,
        )

        dbsession = request.dbsession
        dbsession.add(matakuliah)
        dbsession.flush()

        return {'success': True, 'matakuliah': matakuliah.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Mengubah data matakuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengupdate data matakuliah berdasarkan ID"""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID matakuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})

    try:
        json_data = request.json_body

        if 'kode_mk' in json_data:
            if not str(json_data['kode_mk']).strip():
                return HTTPBadRequest(json_body={'error': 'Field kode_mk tidak boleh kosong!'})
            matakuliah.kode_mk = str(json_data['kode_mk']).strip()

        if 'nama_mk' in json_data:
            if not str(json_data['nama_mk']).strip():
                return HTTPBadRequest(json_body={'error': 'Field nama_mk tidak boleh kosong!'})
            matakuliah.nama_mk = str(json_data['nama_mk']).strip()

        if 'sks' in json_data:
            try:
                matakuliah.sks = validate_positive_int(json_data['sks'], 'sks')
            except ValueError as ve:
                return HTTPBadRequest(json_body={'error': str(ve)})

        if 'semester' in json_data:
            try:
                matakuliah.semester = validate_positive_int(json_data['semester'], 'semester')
            except ValueError as ve:
                return HTTPBadRequest(json_body={'error': str(ve)})

        return {'success': True, 'matakuliah': matakuliah.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus data matakuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus matakuliah berdasarkan ID"""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID matakuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})

    dbsession.delete(matakuliah)
    return {'success': True, 'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus'}