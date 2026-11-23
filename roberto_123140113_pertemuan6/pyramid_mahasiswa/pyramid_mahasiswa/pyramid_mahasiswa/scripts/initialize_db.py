import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan matakuliah ke database"""
    # Seeding Mahasiswa (dicek dulu agar tidak duplikat jika sudah ada)
    if not dbsession.query(models.Mahasiswa).filter_by(nim='12345').first():
        mahasiswa1 = models.Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung'
        )
        dbsession.add(mahasiswa1)

    if not dbsession.query(models.Mahasiswa).filter_by(nim='54321').first():
        mahasiswa2 = models.Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta'
        )
        dbsession.add(mahasiswa2)

    # Seeding Minimal 3 Data Matakuliah
    daftar_mk = [
        models.Matakuliah(
            kode_mk='IF2110',
            nama_mk='Algoritma dan Struktur Data',
            sks=4,
            semester=3
        ),
        models.Matakuliah(
            kode_mk='IF3140',
            nama_mk='Pengembangan Aplikasi Web',
            sks=3,
            semester=5
        ),
        models.Matakuliah(
            kode_mk='IF3150',
            nama_mk='Basis Data Lanjut',
            sks=3,
            semester=5
        ),
    ]

    for mk in daftar_mk:
        if not dbsession.query(models.Matakuliah).filter_by(kode_mk=mk.kode_mk).first():
            dbsession.add(mk)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
        print('Berhasil memasukkan data seeding awal mahasiswa dan matakuliah!')
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "config_uri" option in
    your "development.ini" file is running and accessible.
            ''')


if __name__ == '__main__':
    main()