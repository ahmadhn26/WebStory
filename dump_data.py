import pandas as pd
import json

xl = pd.ExcelFile('Data VDI.xlsx')
out = {}
out['Agregat'] = pd.read_excel(xl, 'Agregat').fillna(0).to_dict('records')
out['SEA'] = pd.read_excel(xl, 'SEA').fillna(0).to_dict('records')
out['Kebocoran'] = pd.read_excel(xl, 'Kebocoran Sampah Plastik').fillna(0).to_dict('records')
out['Kategori'] = pd.read_excel(xl, 'Category Item').fillna(0).to_dict('records')

with open('data_vdi_full.json', 'w') as f:
    json.dump(out, f, indent=2, default=str)
