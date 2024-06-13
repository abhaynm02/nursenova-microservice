package com.abhay.nursenova_gateway.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    private  final  String SECRET_KEY ="c532053aa9f71b95a110771797b42a3422ebc1d9feb58fecf08d453ffc644e10";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValid(String token){
        String username=extractUsername(token);
        return (!isTokenExpired(token));
    }
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims,T>resolver){
        Claims claims =extractAllClaims(token);
        return resolver.apply(claims);
    }

    private  Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey(){
        byte [] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String token){
        try {
           return isValid(token);
        }catch (ExpiredJwtException e){
            throw new ExpiredJwtException(e.getHeader(),e.getClaims(),"Jwt token is expired");
        }catch (InvalidClaimException e){
            throw new JwtException("Jwt token is invalid");
        }
    }
}
