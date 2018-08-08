package com.skcc.oms.example.domain.sample.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QService is a Querydsl query type for Service
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QService extends EntityPathBase<Service> {

    private static final long serialVersionUID = -1495570192L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QService service = new QService("service");

    public final com.sk.cnaps.domain.model.QAbstractEntity _super = new com.sk.cnaps.domain.model.QAbstractEntity(this);

    public final com.sk.cnaps.domain.model.QIdValue business;

    public final StringPath finishDate = createString("finishDate");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    public final EnumPath<ServiceBoundaryType> serviceBoundaryType = createEnum("serviceBoundaryType", ServiceBoundaryType.class);

    public final QServiceDesc serviceDesc;

    public final EnumPath<ServiceLevelType> serviceLevelType = createEnum("serviceLevelType", ServiceLevelType.class);

    public final StringPath startDate = createString("startDate");

    public QService(String variable) {
        this(Service.class, forVariable(variable), INITS);
    }

    public QService(Path<? extends Service> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QService(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QService(PathMetadata metadata, PathInits inits) {
        this(Service.class, metadata, inits);
    }

    public QService(Class<? extends Service> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.business = inits.isInitialized("business") ? new com.sk.cnaps.domain.model.QIdValue(forProperty("business")) : null;
        this.serviceDesc = inits.isInitialized("serviceDesc") ? new QServiceDesc(forProperty("serviceDesc")) : null;
    }

}

