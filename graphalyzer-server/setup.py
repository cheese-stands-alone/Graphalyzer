from distutils.core import setup
from setuptools import setup, find_packages
from os import path

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

here = path.abspath(path.dirname(__file__))

setup(
    name='graphalyzer-server',
    version='0.0.1',
    description='Graphalyzer backend server',
    url='https://github.com/rwhite226/Graphalyzer',
    author='Richard White',
    author_email='rwhite22@iastate.edu',
    license='Apache V2',
    classifiers=[
        # How mature is this project? Common values are
        #   3 - Alpha
        #   4 - Beta
        #   5 - Production/Stable
        'Development Status :: 3 - Alpha',
        'Programming Language :: Python :: 3.5',
    ],

    packages=['src', 'src.websocketserver', 'src.websocketserver.handlers'],

    # Alternatively, if you want to distribute just a my_module.py, uncomment
    # this:
    #   py_modules=["my_module"],

    # List run-time dependencies here.  These will be installed by pip when
    # your project is installed. For an analysis of "install_requires" vs pip's
    # requirements files see:
    # https://packaging.python.org/en/latest/requirements.html
    install_requires=["autobahn[twisted]>=0.9.1"],
)
