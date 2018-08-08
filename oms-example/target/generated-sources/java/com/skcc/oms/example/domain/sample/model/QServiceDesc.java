package com.skcc.oms.example.domain.sample.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QServiceDesc is a Querydsl query type for ServiceDesc
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QServiceDesc extends EntityPathBase<ServiceDesc> {

    private static final long serialVersionUID = -2009209951L;

    public static final QServiceDesc serviceDesc = new QServiceDesc("serviceDesc");

    public final com.sk.cnaps.domain.model.QAbstractEntity _super = new com.sk.cnaps.domain.model.QAbstractEntity(this);

    public final StringPath description = createString("description");

    public final StringPath goal = createString("goal");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath targetUser = createString("targetUser");

    public QServiceDesc(String variable) {
        super(ServiceDesc.class, forVariable(variable));
    }

    public QServiceDesc(Path<? extends ServiceDesc> path) {
        super(path.getType(), path.getMetadata());
    }

    public QServiceDesc(PathMetadata metadata) {
        super(ServiceDesc.class, metadata);
    }

}

