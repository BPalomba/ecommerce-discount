package com.invop.inventario.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name ="Articulos")
public class EstadoOrdenCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion_estado_orden_compra")
    private String descripcionEstadoOrdenCompra;

    @Column(name = "fecha_hora_baja_estado_orden_compra")
    private LocalDate fechaHoraBajaEstadoOrdenCompra;

    @Column(name = "nombre_estado_orden_compra")
    private String nombreEstadoOrdenCompra;

}
