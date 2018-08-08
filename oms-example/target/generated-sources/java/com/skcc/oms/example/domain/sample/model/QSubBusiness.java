package com.skcc.oms.example.domain.sample.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QSubBusiness is a Querydsl query type for SubBusiness
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSubBusiness extends EntityPathBase<SubBusiness> {

    private static final long serialVersionUID = 87338715L;

    public static final QSubBusiness subBusiness = new QSubBusiness("subBusiness");

    public final com.sk.cnaps.domain.model.QAbstractEntity _super = new com.sk.cnaps.domain.model.QAbstractEntity(this);

    public final StringPath description = createString("description");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    public QSubBusiness(String variable) {
        super(SubBusiness.class, forVariable(variable));
    }

    public QSubBusiness(Path<? extends SubBusiness> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSubBusiness(PathMetadata metadata) {
        super(SubBusiness.class, metadata);
    }

}

