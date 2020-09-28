# #!/usr/bin/env python
# # -*- coding: utf-8 -*-

from setuptools import setup, find_packages

version = '0.0.2'

setup(
    name='broadlink_service',
    version=version,
    author='Timothy Stewart',
    url='http://github.com/techno-tim/techno-broadlink',
    packages=find_packages(),
    scripts=[],
    install_requires=['cryptography>=2.1.1'],
    description='A Web API and UI to control broadlink devices',
    include_package_data=True,
    zip_safe=False,
)
