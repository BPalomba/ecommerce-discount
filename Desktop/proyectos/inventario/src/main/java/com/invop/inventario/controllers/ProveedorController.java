package com.invop.inventario.controllers;

import com.invop.inventario.dto.ProveedorDTO;
import com.invop.inventario.entities.Proveedor;
import com.invop.inventario.mappers.ProveedorMapper;
import com.invop.inventario.services.ProveedorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {

    private ProveedorService proveedorService;
    private ProveedorMapper proveedorMapper;

    @GetMapping
    public ResponseEntity<List<ProveedorDTO>> getAll() {
        //guardo todos los provedores
        List<Proveedor> proveedores = proveedorService.findAll();
        // mapeo
        List<ProveedorDTO> dtos = proveedorMapper.toDtoList(proveedores);

        if (proveedores.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            // los mando si esta todo ok
            return ResponseEntity.ok(dtos);
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ProveedorDTO proveedorDTO) {
        try{
            //paso a entidad lo que ingresa el usuario
            Proveedor proveedor = proveedorMapper.toEntity(proveedorDTO);
            //paso a dto lo q guarde
            ProveedorDTO savedProveedorDTO = proveedorMapper.toDto(proveedor);
            // devuelvo q esta bien y le muestro lo que se guardo
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProveedorDTO);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error al dar de alta un proveedor" + e.getMessage());
        }

    }

}
