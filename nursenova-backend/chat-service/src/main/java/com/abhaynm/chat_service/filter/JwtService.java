//package com.abhaynm.chat_service.filter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.List;
//import java.util.function.Function;
//import java.util.stream.Collectors;
//
//@Service
//@Slf4j
//public class JwtService {
//    private  final  String SECRET_KEY ="c532053aa9f71b95a110771797b42a3422ebc1d9feb58fecf08d453ffc644e10";
//
//    public String extractUsername(String token){
//        return extractClaim(token, Claims::getSubject);
//    }
//
//
//    public List<SimpleGrantedAuthority> extractRoles(String token) {
//        Object rolesObject = extractClaim(token, claims -> claims.get("role"));
//        List<String> roles;
//        if (rolesObject instanceof String) {
//            roles = List.of((String) rolesObject);
//        } else if (rolesObject instanceof List) {
//            roles = (List<String>) rolesObject;
//        } else {
//            throw new IllegalArgumentException("Invalid role claim in JWT token");
//        }
//        return roles.stream()
//                .map(role -> new SimpleGrantedAuthority(role))
//                .collect(Collectors.toList());
//    }
////public List<String> extractRoles(String token) {
////    Object rolesObject = extractClaim(token, claims -> claims.get("role"));
////    List<String> roles;
////    if (rolesObject instanceof String) {
////        roles = List.of((String) rolesObject);
////    } else if (rolesObject instanceof List) {
////        roles = (List<String>) rolesObject;
////    } else {
////        throw new IllegalArgumentException("Invalid role claim in JWT token");
////    }
////    return roles ;
////}
//
//    public <T> T extractClaim(String token, Function<Claims,T>resolver){
//        Claims claims =extractAllClaims(token);
//        return resolver.apply(claims);
//    }
//
//    private  Claims extractAllClaims(String token){
//        return Jwts
//                .parser()
//                .verifyWith(getSigningKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//    }
//
//
//
//    private SecretKey getSigningKey(){
//        byte [] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//}
